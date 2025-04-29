import React from 'react';
import Layout from '../components/common/Layout';
import ProfileForm from '../components/profile/ProfileForm';

const ProfileSetupPage: React.FC = () => {
  return (
    <Layout requireAuth={false} title="Profile Setup">
      <div className="py-10">
        <ProfileForm />
      </div>
    </Layout>
  );
};

export default ProfileSetupPage;