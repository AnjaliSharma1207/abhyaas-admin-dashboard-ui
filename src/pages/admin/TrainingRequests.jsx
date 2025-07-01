import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  approveRequest,
  rejectRequest,
} from '../../store/slices/trainingRequestsSlice';

const TrainingRequests = () => {
  const dispatch = useDispatch();
  const { requests } = useSelector((state) => state.trainingRequests);

  const [selectedEmployees, setSelectedEmployees] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const handleViewEmployees = (topic) => {
    const employees = requests.filter((r) => r.topic === topic);
    setSelectedEmployees(employees);
    setShowModal(true);
  };

  const handleApprove = (id) => {
    dispatch(approveRequest(id));
  };

  const handleReject = (id) => {
    dispatch(rejectRequest(id));
  };

  return (
    <div className="container py-5">
      <div className="card shadow p-4">
        <h2 className="mb-4 fw-bold">All Training Requests</h2>
        {requests.length === 0 ? (
          <p>No data found.</p>
        ) : (
          <div className="table-responsive">
            <table className="table table-bordered table-striped">
              <thead className="table-light">
                <tr>
                  <th>Topic</th>
                  <th>Custom Topic</th>
                  <th>Priority</th>
                  <th>Preferred Date</th>
                  <th>Objective</th>
                  <th>Status</th>
                  <th>Participants</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {requests.map((req) => (
                  <tr key={req.id}>
                    <td>{req.topic}</td>
                    <td>{req.customTopic || '-'}</td>
                    <td>{req.priority}</td>
                    <td>{req.preferredDate}</td>
                    <td>{req.objective}</td>
                    <td>
                      <span className="badge bg-info">{req.status}</span>
                    </td>
                    <td>
                      {
                        requests.filter((r) => r.topic === req.topic).length
                      }
                    </td>
                    <td className="d-flex flex-wrap gap-1">
                      <button
                        className="btn btn-sm btn-success"
                        onClick={() => handleApprove(req.id)}
                      >
                        Approve
                      </button>
                      <button
                        className="btn btn-sm btn-danger"
                        onClick={() => handleReject(req.id)}
                      >
                        Reject
                      </button>
                      <button
                        className="btn btn-sm btn-secondary"
                        onClick={() => handleViewEmployees(req.topic)}
                      >
                        View Employees
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Modal for Employee Details */}
      {showModal && (
        <div className="modal fade show d-block" tabIndex="-1">
          <div className="modal-dialog modal-lg">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Employees for {selectedEmployees[0]?.topic}</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setShowModal(false)}
                ></button>
              </div>
              <div className="modal-body">
                <table className="table">
                  <thead>
                    <tr>
                      <th>Topic</th>
                      <th>Custom Topic</th>
                      <th>Preferred Date</th>
                      <th>Objective</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {selectedEmployees.map((emp) => (
                      <tr key={emp.id}>
                        <td>{emp.topic}</td>
                        <td>{emp.customTopic || '-'}</td>
                        <td>{emp.preferredDate}</td>
                        <td>{emp.objective}</td>
                        <td>
                          <span className="badge bg-info">{emp.status}</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setShowModal(false)}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TrainingRequests;
