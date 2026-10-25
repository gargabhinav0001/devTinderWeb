import EditProfile from "./EditProfile";
import ChangePassword from "./ChangePassword";

const ProfileSettings = ({ user, onUpdate, onUpdatePassword }) => {
  return (
    <main className="min-h-screen bg-base-200/60 py-10 px-4">
      <div className="max-w-3xl mx-auto space-y-6">
        <header className="mb-8">
          <p className="text-sm font-semibold text-primary mb-2">
            ACCOUNT SETTINGS
          </p>

          <h1 className="text-3xl font-bold">Your profile</h1>

          <p className="text-base-content/60 mt-2">
            Manage your personal information and account security.
          </p>
        </header>

        <EditProfile user={user} onUpdate={onUpdate} />

        <ChangePassword onUpdatePassword={onUpdatePassword} />

        <p className="text-center text-xs text-base-content/50 pb-4">
          Keep your profile up to date and your account secure.
        </p>
      </div>
    </main>
  );
};

export default ProfileSettings;
