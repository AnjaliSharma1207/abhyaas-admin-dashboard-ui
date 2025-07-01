export const getStatusColor = (status) => {
  switch (status) {
    case 'Pending':
      return 'warning';
    case 'Approved':
      return 'info';
    case 'Rejected':
      return 'error';
    case 'Assigned':
      return 'primary';
    case 'Completed':
      return 'success';
    default:
      return 'default';
  }
};

export const getPriorityColor = (priority) => {
  switch (priority) {
    case 'High':
      return 'error';
    case 'Medium':
      return 'warning';
    case 'Low':
      return 'success';
    default:
      return 'default';
  }
};
