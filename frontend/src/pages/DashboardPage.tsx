import { useEffect, useState } from 'react';
import { useAuthContext } from '../hooks/AuthContext';
import { contentService } from '../services/authService';

interface ContentData {
  message: string;
  access: string;
}

const DashboardPage = () => {
  const { user, isAdmin } = useAuthContext();

  const [publicData, setPublicData] = useState<ContentData | null>(null);
  const [userData, setUserData] = useState<ContentData | null>(null);
  const [adminData, setAdminData] = useState<ContentData | null>(null);

  const [loadingPublic, setLoadingPublic] = useState(true);
  const [loadingUser, setLoadingUser] = useState(true);
  const [loadingAdmin, setLoadingAdmin] = useState(true);

  const [errorUser, setErrorUser] = useState('');
  const [errorAdmin, setErrorAdmin] = useState('');

  useEffect(() => {
    // Public content - anyone
    contentService.getPublic()
      .then(setPublicData)
      .finally(() => setLoadingPublic(false));

    // User content
    contentService.getUserContent()
      .then(setUserData)
      .catch(() => setErrorUser('Access denied'))
      .finally(() => setLoadingUser(false));

    // Admin content - only fetch if ADMIN
    if (isAdmin) {
      contentService.getAdminContent()
        .then(setAdminData)
        .catch(() => setErrorAdmin('Access denied'))
        .finally(() => setLoadingAdmin(false));
    } else {
      setLoadingAdmin(false);
    }
  }, [isAdmin]);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto">

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>
          <p className="text-gray-500 mt-1">
            Logged in as <span className="font-semibold">{user?.name}</span> &nbsp;·&nbsp;
            <span className={`font-semibold ${isAdmin ? 'text-red-500' : 'text-indigo-500'}`}>
              {user?.role}
            </span>
          </p>
        </div>

        {/* Content Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

          {/* Public Card - visible to everyone */}
          <ContentCard
            title="🌐 Public Content"
            badge="PUBLIC"
            badgeColor="bg-green-100 text-green-700"
            loading={loadingPublic}
            message={publicData?.message}
            description="Accessible by anyone, no login required."
          />

          {/* User Content Card - USER and ADMIN */}
          <ContentCard
            title="👤 User Content"
            badge="USER"
            badgeColor="bg-indigo-100 text-indigo-700"
            loading={loadingUser}
            message={userData?.message}
            error={errorUser}
            description="Accessible by all logged-in users."
          />

          {/* Admin Content Card - ADMIN only */}
          {isAdmin ? (
            <ContentCard
              title="🔴 Admin Content"
              badge="ADMIN"
              badgeColor="bg-red-100 text-red-700"
              loading={loadingAdmin}
              message={adminData?.message}
              error={errorAdmin}
              description="Restricted to ADMIN role only."
            />
          ) : (
            <div className="bg-gray-100 border-2 border-dashed border-gray-300 rounded-2xl p-6 flex flex-col items-center justify-center text-center">
              <span className="text-4xl mb-3">🔒</span>
              <h3 className="font-semibold text-gray-500">Admin Content</h3>
              <p className="text-xs text-gray-400 mt-1">
                You need ADMIN role to view this section.
              </p>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

// Reusable card component
interface CardProps {
  title: string;
  badge: string;
  badgeColor: string;
  loading: boolean;
  message?: string;
  error?: string;
  description: string;
}

const ContentCard = ({ title, badge, badgeColor, loading, message, error, description }: CardProps) => (
  <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex flex-col gap-3">
    <div className="flex items-center justify-between">
      <h3 className="font-semibold text-gray-800">{title}</h3>
      <span className={`text-xs font-bold px-2 py-1 rounded-full ${badgeColor}`}>{badge}</span>
    </div>
    <p className="text-xs text-gray-400">{description}</p>
    <div className="mt-auto pt-2 border-t border-gray-50">
      {loading ? (
        <p className="text-sm text-gray-400 animate-pulse">Loading...</p>
      ) : error ? (
        <p className="text-sm text-red-500">⚠️ {error}</p>
      ) : (
        <p className="text-sm text-gray-700">{message}</p>
      )}
    </div>
  </div>
);

export default DashboardPage;
