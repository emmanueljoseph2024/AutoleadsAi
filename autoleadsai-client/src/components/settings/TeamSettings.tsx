// src/components/settings/TeamSettings.tsx

import { useState } from 'react';
import {
  FiUsers,
  FiUserPlus,
  FiTrash2,
  FiMail,
  FiAlertCircle,
  FiRefreshCw,
} from 'react-icons/fi';
import Input from '../common/Input';
import Button from '../common/Button';
import Badge from '../common/Badge';
import Avatar from '../common/Avatar';
import Dropdown from '../common/Dropdown';
import ConfirmDialog from '../common/ConfirmDialog';
import EmptyState from '../common/EmptyState';
import { SkeletonList } from '../common/Skeleton';
import { sanitizeString, sanitizeEmail } from '../../utils/sanitizers';
import { isValidEmail } from '../../utils/validators';
import api from '../../services/api';

interface TeamMember {
  _id: string;
  userId: {
    _id: string;
    firstName: string;
    lastName: string;
    email: string;
  };
  role: 'admin' | 'member' | 'viewer';
  joinedAt: string;
}

interface PendingInvite {
  _id: string;
  email: string;
  role: string;
  status: string;
  createdAt: string;
}

interface TeamSettingsProps {
  members: TeamMember[];
  invites: PendingInvite[];
  maxMembers: number;
  loading?: boolean;
  error?: string;
  onRetry?: () => void;
  onMemberUpdated?: () => void;
}

const roleOptions = [
  { value: 'admin', label: 'Admin — Full access' },
  { value: 'member', label: 'Member — Can manage leads & scans' },
  { value: 'viewer', label: 'Viewer — Read-only access' },
];

const TeamSettings = ({
  members,
  invites,
  maxMembers,
  loading = false,
  error = '',
  onRetry,
  onMemberUpdated,
}: TeamSettingsProps) => {
  const [inviteEmail, setInviteEmail] = useState('');
  const [inviteRole, setInviteRole] = useState('member');
  const [sending, setSending] = useState(false);
  const [inviteError, setInviteError] = useState('');
  const [removeMember, setRemoveMember] = useState<TeamMember | null>(null);
  const [removeLoading, setRemoveLoading] = useState(false);

  const handleSendInvite = async () => {
    const trimmedEmail = sanitizeEmail(inviteEmail);
    if (!trimmedEmail || !isValidEmail(trimmedEmail)) {
      setInviteError('Please enter a valid email address');
      return;
    }

    if (members.length + invites.length >= maxMembers) {
      setInviteError(`Team is full (max ${maxMembers} members)`);
      return;
    }

    setSending(true);
    setInviteError('');
    try {
      await api.post('/team/invite', {
        email: trimmedEmail,
        role: inviteRole,
      });
      setInviteEmail('');
      onMemberUpdated?.();
    } catch (err: any) {
      setInviteError(err?.response?.data?.error || 'Failed to send invite.');
    } finally {
      setSending(false);
    }
  };

  const handleRemoveMember = async () => {
    if (!removeMember) return;
    setRemoveLoading(true);
    try {
      await api.delete(`/team/members/${removeMember.userId._id}`);
      setRemoveMember(null);
      onMemberUpdated?.();
    } catch (err: any) {
      // Error handled silently
    } finally {
      setRemoveLoading(false);
    }
  };

  const handleRoleChange = async (member: TeamMember, newRole: string) => {
    try {
      await api.put(`/team/members/${member.userId._id}`, { role: newRole });
      onMemberUpdated?.();
    } catch (err: any) {
      // Error handled silently
    }
  };

  if (error) {
    return (
      <div className="p-4 bg-[#FEE2E2] border border-[#EF4444]/20 rounded-xl flex items-center gap-3 text-[#EF4444] text-sm">
        <FiAlertCircle className="w-5 h-5 shrink-0" />
        <span>{error}</span>
        {onRetry && (
          <button onClick={onRetry} className="ml-auto flex items-center gap-1.5 text-[#2563EB] hover:underline font-medium shrink-0">
            <FiRefreshCw className="w-4 h-4" /> Retry
          </button>
        )}
      </div>
    );
  }

  if (loading) {
    return <SkeletonList rows={4} />;
  }

  return (
    <div className="space-y-6">
      {/* Invite Section */}
      <div className="bg-[#F9FAFB] rounded-xl p-4">
        <h4 className="text-sm font-semibold text-[#111827] mb-3 flex items-center gap-2">
          <FiUserPlus className="w-4 h-4" />
          Invite Team Member
        </h4>
        <div className="flex flex-col sm:flex-row gap-3">
          <Input
            type="email"
            value={inviteEmail}
            onChange={(e) => {
              setInviteEmail(e.target.value);
              if (inviteError) setInviteError('');
            }}
            placeholder="colleague@example.com"
            icon={<FiMail className="w-4 h-4" />}
            error={inviteError}
            className="flex-1"
            maxLength={255}
          />
          <Dropdown
            label=""
            options={roleOptions}
            value={inviteRole}
            onChange={setInviteRole}
            className="w-full sm:w-44 shrink-0"
          />
          <Button
            onClick={handleSendInvite}
            loading={sending}
            disabled={!inviteEmail.trim()}
            className="shrink-0"
          >
            Send Invite
          </Button>
        </div>
      </div>

      {/* Members List */}
      <div>
        <h4 className="text-sm font-semibold text-[#111827] mb-3 flex items-center gap-2">
          <FiUsers className="w-4 h-4" />
          Team Members ({members.length}/{maxMembers})
        </h4>

        {members.length === 0 ? (
          <EmptyState
            title="No team members"
            description="Invite your first team member to collaborate."
          />
        ) : (
          <div className="space-y-2">
            {members.map((member) => (
              <div
                key={member._id}
                className="flex items-center justify-between bg-white border border-[#E5E7EB] rounded-xl p-3"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <Avatar
                    name={`${member.userId.firstName} ${member.userId.lastName}`}
                    size="md"
                  />
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-[#111827] truncate">
                      {sanitizeString(member.userId.firstName)} {sanitizeString(member.userId.lastName)}
                    </p>
                    <p className="text-xs text-[#9CA3AF] truncate">
                      {sanitizeString(member.userId.email)}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <Dropdown
                    label=""
                    options={roleOptions}
                    value={member.role}
                    onChange={(role) => handleRoleChange(member, role)}
                    className="w-36"
                  />
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setRemoveMember(member)}
                    icon={<FiTrash2 className="w-4 h-4 text-[#EF4444]" />}
                  >
                    {''}
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Pending Invites */}
      {invites.length > 0 && (
        <div>
          <h4 className="text-sm font-semibold text-[#111827] mb-3">
            Pending Invites ({invites.length})
          </h4>
          <div className="space-y-2">
            {invites.map((invite) => (
              <div
                key={invite._id}
                className="flex items-center justify-between bg-white border border-[#E5E7EB] rounded-xl p-3"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 bg-[#F3F4F6] rounded-lg flex items-center justify-center">
                    <FiMail className="w-4 h-4 text-[#9CA3AF]" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-[#111827]">
                      {sanitizeString(invite.email)}
                    </p>
                    <p className="text-xs text-[#9CA3AF]">
                      Invited as {invite.role}
                    </p>
                  </div>
                </div>
                <Badge variant="warning" size="sm">Pending</Badge>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Remove Confirmation */}
      <ConfirmDialog
        isOpen={!!removeMember}
        onClose={() => setRemoveMember(null)}
        onConfirm={handleRemoveMember}
        title="Remove Team Member"
        message={`Are you sure you want to remove ${removeMember?.userId.firstName} ${removeMember?.userId.lastName} from the team?`}
        confirmLabel="Remove"
        variant="danger"
        loading={removeLoading}
      />
    </div>
  );
};

export default TeamSettings;