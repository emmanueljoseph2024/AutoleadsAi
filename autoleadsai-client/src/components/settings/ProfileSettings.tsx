// src/components/settings/ProfileSettings.tsx

import { useState } from 'react';
import { FiUser, FiMail, FiSave, FiAlertCircle } from 'react-icons/fi';
import Input from '../common/Input';
import Button from '../common/Button';
import Avatar from '../common/Avatar';
import Toast from '../common/Toast';
import { sanitizeString, normalizeName, sanitizeEmail } from '../../utils/sanitizers';
import { API_ENDPOINTS } from '../../utils/constants';
import api from '../../services/api';

interface ProfileSettingsProps {
  user: {
    firstName: string;
    lastName: string;
    email: string;
    avatar?: string;
  };
  onProfileUpdated?: (user: any) => void;
}

const ProfileSettings = ({ user, onProfileUpdated }: ProfileSettingsProps) => {
  const [firstName, setFirstName] = useState(user.firstName || '');
  const [lastName, setLastName] = useState(user.lastName || '');
  const [email] = useState(user.email || '');
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};
    if (!firstName.trim()) newErrors.firstName = 'First name is required';
    if (!lastName.trim()) newErrors.lastName = 'Last name is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    try {
      const sanitizedData = {
        firstName: normalizeName(sanitizeString(firstName)),
        lastName: normalizeName(sanitizeString(lastName)),
      };

      const { data } = await api.put(API_ENDPOINTS.SETTINGS.PROFILE, sanitizedData);
      setToast({ message: 'Profile updated successfully!', type: 'success' });
      onProfileUpdated?.(data.user);
    } catch (err: any) {
      setToast({ message: err?.response?.data?.error || 'Failed to update profile.', type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Avatar Section */}
      <div className="flex items-center gap-4 pb-6 border-b border-[#E5E7EB]">
        <Avatar
          name={`${user.firstName} ${user.lastName}`}
          size="xl"
        />
        <div>
          <h3 className="text-lg font-bold text-[#111827]">
            {sanitizeString(user.firstName)} {sanitizeString(user.lastName)}
          </h3>
          <p className="text-sm text-[#6B7280]">{sanitizeString(user.email)}</p>
        </div>
      </div>

      {/* Profile Form */}
      <form onSubmit={handleSave} className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Input
            label="First Name"
            type="text"
            value={firstName}
            onChange={(e) => {
              setFirstName(e.target.value);
              if (errors.firstName) setErrors((prev) => ({ ...prev, firstName: '' }));
            }}
            placeholder="John"
            icon={<FiUser className="w-4 h-4" />}
            error={errors.firstName}
            maxLength={50}
          />
          <Input
            label="Last Name"
            type="text"
            value={lastName}
            onChange={(e) => {
              setLastName(e.target.value);
              if (errors.lastName) setErrors((prev) => ({ ...prev, lastName: '' }));
            }}
            placeholder="Doe"
            icon={<FiUser className="w-4 h-4" />}
            error={errors.lastName}
            maxLength={50}
          />
        </div>

        <Input
          label="Email Address"
          type="email"
          value={email}
          disabled
          icon={<FiMail className="w-4 h-4" />}
          hint="Contact support to change your email address."
        />

        <Button
          type="submit"
          loading={loading}
          icon={<FiSave className="w-4 h-4" />}
        >
          Save Changes
        </Button>
      </form>

      {toast && (
        <div className="fixed top-4 right-4 z-50 animate-slide-down">
          <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />
        </div>
      )}
    </div>
  );
};

export default ProfileSettings;