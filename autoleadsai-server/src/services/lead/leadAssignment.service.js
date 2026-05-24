import { Lead, Team } from '../../models/index.js';
import { logger } from '../../utils/logger.js';

// ─── Assign Lead to Team Member ─────────────────────

export const assignLeadToMember = async (leadId, assignedUserId, assignedBy) => {
  try {
    // Verify the lead belongs to the same workspace
    const lead = await Lead.findOne({ _id: leadId, userId: assignedBy });
    if (!lead) throw new Error('Lead not found');

    // Verify assigned user is in the same team
    const team = await Team.findOne({
      $or: [{ ownerId: assignedBy }, { 'members.userId': assignedBy }],
      $or: [
        { ownerId: assignedUserId },
        { 'members.userId': assignedUserId },
      ],
    });

    if (!team) throw new Error('Assigned user is not in your team');

    lead.assignedTo = assignedUserId;
    await lead.save();

    logger.info(`Lead ${leadId} assigned to user ${assignedUserId} by ${assignedBy}`);
    return lead;
  } catch (error) {
    logger.error(`Failed to assign lead ${leadId}:`, error);
    throw error;
  }
};

// ─── Unassign Lead ──────────────────────────────────

export const unassignLead = async (leadId, userId) => {
  try {
    const lead = await Lead.findOneAndUpdate(
      { _id: leadId, userId },
      { $unset: { assignedTo: '' } },
      { new: true }
    );

    if (!lead) throw new Error('Lead not found');

    logger.info(`Lead ${leadId} unassigned by user ${userId}`);
    return lead;
  } catch (error) {
    logger.error(`Failed to unassign lead ${leadId}:`, error);
    throw error;
  }
};

// ─── Get Leads Assigned to a Member ─────────────────

export const getAssignedLeads = async (userId, memberId, filters = {}) => {
  try {
    const query = {
      userId,
      assignedTo: memberId,
      ...filters,
    };

    const leads = await Lead.find(query)
      .sort({ createdAt: -1 })
      .select('name email company qualification status source sourceUrl assignedTo createdAt')
      .lean();

    return leads;
  } catch (error) {
    logger.error(`Failed to get assigned leads for member ${memberId}:`, error);
    throw error;
  }
};

// ─── Bulk Assign Leads ──────────────────────────────

export const bulkAssignLeads = async (leadIds, assignedUserId, assignedBy) => {
  try {
    const result = await Lead.updateMany(
      { _id: { $in: leadIds }, userId: assignedBy },
      { assignedTo: assignedUserId }
    );

    logger.info(`${result.modifiedCount} leads assigned to user ${assignedUserId}`);
    return { assignedCount: result.modifiedCount };
  } catch (error) {
    logger.error(`Failed to bulk assign leads:`, error);
    throw error;
  }
};

// ─── Get Team Lead Distribution ─────────────────────

export const getTeamLeadDistribution = async (userId) => {
  try {
    const team = await Team.findOne({
      $or: [{ ownerId: userId }, { 'members.userId': userId }],
    });

    if (!team) {
      // User has no team — return only their own leads
      const count = await Lead.countDocuments({ userId });
      return { [userId.toString()]: count };
    }

    // Get all member IDs including owner
    const memberIds = [
      team.ownerId,
      ...team.members.map((m) => m.userId),
    ];

    // Count leads per member
    const distribution = await Lead.aggregate([
      { $match: { userId: { $in: memberIds } } },
      {
        $group: {
          _id: '$assignedTo',
          count: { $sum: 1 },
          hot: {
            $sum: { $cond: [{ $eq: ['$qualification', 'hot'] }, 1, 0] },
          },
        },
      },
    ]);

    return distribution.reduce((acc, item) => {
      acc[item._id?.toString() || 'unassigned'] = {
        total: item.count,
        hot: item.hot,
      };
      return acc;
    }, {});
  } catch (error) {
    logger.error(`Failed to get team lead distribution for user ${userId}:`, error);
    throw error;
  }
};