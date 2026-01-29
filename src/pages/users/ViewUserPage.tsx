import { useNavigate, useParams, Link } from 'react-router-dom';
import { ArrowLeft, Pencil, Mail, Phone, MapPin, Calendar, User as UserIcon } from 'lucide-react';
import { useUser } from '@/hooks/useUsers';
import { Button } from '@/components/ui/button';
import { PageLoader } from '@/components/ui/loading-spinner';
import { Badge } from '@/components/ui/badge';
import { format } from 'date-fns';

export function ViewUserPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { data: user, isLoading, error } = useUser(id!);

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

  const initials = `${user.firstName.charAt(0)}${user.lastName.charAt(0)}`.toUpperCase();

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="page-title">User Details</h1>
        </div>
        <Button asChild>
          <Link to={`/users/edit/${user._id}`}>
            <Pencil className="mr-2 h-4 w-4" />
            Edit User
          </Link>
        </Button>
      </div>

      {/* User Profile Card */}
      <div className="detail-card">
        <div className="flex flex-col sm:flex-row items-start gap-6">
          {/* Avatar */}
          <div className="flex h-24 w-24 items-center justify-center rounded-full bg-primary text-primary-foreground text-3xl font-bold shrink-0">
            {initials}
          </div>

          {/* User Info */}
          <div className="flex-1 space-y-4">
            <div>
              <h2 className="text-2xl font-bold text-foreground">
                {user.firstName} {user.lastName}
              </h2>
              <Badge variant="secondary" className="mt-2">Active User</Badge>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {/* Email */}
              <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                  <Mail className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Email</p>
                  <a href={`mailto:${user.email}`} className="font-medium text-foreground hover:text-primary">
                    {user.email}
                  </a>
                </div>
              </div>

              {/* Phone */}
              <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent/10">
                  <Phone className="h-5 w-5 text-accent" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Phone</p>
                  <a href={`tel:${user.phone}`} className="font-medium text-foreground hover:text-primary">
                    {user.phone}
                  </a>
                </div>
              </div>

              {/* Address */}
              <div className="flex items-start gap-3 sm:col-span-2">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-success/10">
                  <MapPin className="h-5 w-5 text-success" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Address</p>
                  <p className="font-medium text-foreground">
                    {user.address}
                    <br />
                    {user.city}, {user.state} {user.zipCode}
                  </p>
                </div>
              </div>

              {/* Created At */}
              <div className="flex items-start gap-3 sm:col-span-2">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-warning/10">
                  <Calendar className="h-5 w-5 text-warning" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Member Since</p>
                  <p className="font-medium text-foreground">
                    {format(new Date(user.createdAt), 'MMMM dd, yyyy')}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid gap-4 sm:grid-cols-3">
        <div className="stat-card">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
              <UserIcon className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Status</p>
              <p className="font-semibold text-foreground">Active</p>
            </div>
          </div>
        </div>

        <div className="stat-card">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-success/10">
              <MapPin className="h-5 w-5 text-success" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">State</p>
              <p className="font-semibold text-foreground">{user.state}</p>
            </div>
          </div>
        </div>

        <div className="stat-card">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-warning/10">
              <Calendar className="h-5 w-5 text-warning" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">ZIP Code</p>
              <p className="font-semibold text-foreground">{user.zipCode}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
