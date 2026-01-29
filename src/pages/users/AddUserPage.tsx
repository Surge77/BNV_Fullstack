import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { useCreateUser } from '@/hooks/useUsers';
import { UserForm } from '@/components/users/UserForm';
import { Button } from '@/components/ui/button';
import type { UserFormValues } from '@/lib/validations';

export function AddUserPage() {
  const navigate = useNavigate();
  const createUser = useCreateUser();

  const handleSubmit = async (data: UserFormValues) => {
    await createUser.mutateAsync(data as import('@/types/user').UserFormData);
    navigate('/users');
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* Page Header */}
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <div>
          <h1 className="page-title">Add New User</h1>
          <p className="page-description">Create a new user account</p>
        </div>
      </div>

      {/* Form */}
      <div className="form-section">
        <UserForm
          onSubmit={handleSubmit}
          isLoading={createUser.isPending}
          submitLabel="Create User"
        />
      </div>
    </div>
  );
}
