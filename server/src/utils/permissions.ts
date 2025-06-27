// types/permissions.ts
export type Role =
  | 'student'
  | 'educator'
  | 'admin'
  | 'stakeholder'
  | 'researcher';

export type Permission =
  | 'view_courses'
  | 'enroll_courses'
  | 'submit_assignments'
  | 'view_grades'
  | 'access_resources'
  | 'participate_discussions'
  | 'create_courses'
  | 'manage_courses'
  | 'grade_assignments'
  | 'view_student_progress'
  | 'create_resources'
  | 'moderate_discussions'
  | 'generate_reports'
  | 'manage_users'
  | 'approve_roles'
  | 'view_all_data'
  | 'system_settings'
  | 'manage_permissions'
  | 'access_analytics'
  | 'bulk_operations'
  | 'audit_logs'
  | 'view_analytics'
  | 'access_reports'
  | 'view_progress_data'
  | 'export_data'
  | 'stakeholder_dashboard'
  | 'access_research_data'
  | 'export_anonymized_data'
  | 'research_tools'
  | 'data_visualization';

export const rolePermissions: Record<Role, Permission[]> = {
  student: [
    'view_courses',
    'enroll_courses',
    'submit_assignments',
    'view_grades',
    'access_resources',
    'participate_discussions',
  ],
  educator: [
    'create_courses',
    'manage_courses',
    'grade_assignments',
    'view_student_progress',
    'create_resources',
    'moderate_discussions',
    'generate_reports',
  ],
  admin: [
    'manage_users',
    'approve_roles',
    'view_all_data',
    'system_settings',
    'manage_permissions',
    'access_analytics',
    'bulk_operations',
    'audit_logs',
  ],
  stakeholder: [
    'view_analytics',
    'access_reports',
    'view_progress_data',
    'export_data',
    'stakeholder_dashboard',
  ],
  researcher: [
    'access_research_data',
    'export_anonymized_data',
    'view_analytics',
    'research_tools',
    'data_visualization',
  ],
};

export const assignRolePermissions = (role: Role): Permission[] => {
  return rolePermissions[role] || [];
};

export const hasPermission = (
  userPermissions: Permission[],
  requiredPermission: Permission
): boolean => {
  return userPermissions.includes(requiredPermission);
};

export const hasAnyPermission = (
  userPermissions: Permission[],
  requiredPermissions: Permission[]
): boolean => {
  return requiredPermissions.some((permission) =>
    userPermissions.includes(permission)
  );
};
