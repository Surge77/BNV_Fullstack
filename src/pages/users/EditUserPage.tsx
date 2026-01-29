import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { useUser, useUpdateUser } from '@/hooks/useUsers';
import { UserForm } from '@/components/users/UserForm';
import { Button } from '@/components/ui/button';
import { PageLoader } from '@/components/ui/loading-spinner';
import type { UserFormValues } from '@/lib/validations';

export function EditUserPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { data: user, isLoading, error } = useUser(id!);
  const updateUser = useUpdateUser();

  const handleSubmit = async (data: UserFormValues) => {
    await updateUser.mutateAsync({ id: id!, userData: data as import('@/types/user').UserFormData });
    navigate('/users');
  };

  if (isLoading) {
    return <PageLoader />;
  }

  if (error || !user) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] gap-4">
        <h2 className="text-xl font-semibold">User not found</h2>
        <Button onClick={() => navigate('/users')}>Back to Users</Button>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* Page Header */}
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <div>
          <h1 className="page-title">Edit User</h1>
          <p className="page-description">Update user information for {user.firstName} {user.lastName}</p>
        </div>
      </div>

      {/* Form */}
      <div className="form-section">
        <UserForm
          defaultValues={user}
          onSubmit={handleSubmit}
          isLoading={updateUser.isPending}
          submitLabel="Update User"
        />
      </div>
    </div>
  );
}
