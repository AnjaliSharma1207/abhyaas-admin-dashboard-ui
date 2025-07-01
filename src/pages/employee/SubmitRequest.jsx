import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addRequest, deleteRequest } from '../../store/slices/trainingRequestsSlice';

const SubmitRequest = () => {
  const dispatch = useDispatch();
  const { requests, dummyTrainingRequest, topics } = useSelector(
    (state) => state.trainingRequests
  );

  const [formData, setFormData] = useState(dummyTrainingRequest);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.topic || !formData.objective) {
      alert('Please fill in required fields.');
      return;
    }
    dispatch(addRequest(formData));
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
    setFormData(dummyTrainingRequest);
  };

  const handleReset = () => setFormData(dummyTrainingRequest);

  const handleDelete = (id) => {
    dispatch(deleteRequest(id));
  };

  return (
    <div className="container py-5">
      <div className="card shadow p-4 mb-5">
        <h2 className="text-center mb-4 fw-bold">Submit Training Request</h2>

        {showSuccess && (
          <div className="alert alert-success" role="alert">
            Training request submitted successfully!
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="row g-3">
            {/* Topic */}
            <div className="col-md-6">
              <label className="form-label">Training Topic *</label>
              <select
                className="form-select"
                name="topic"
                value={formData.topic}
                onChange={handleChange}
                required
              >
                <option value="">Select Topic</option>
                {topics.map((topic) => (
                  <option key={topic} value={topic}>
                    {topic}
                  </option>
                ))}
              </select>
            </div>

            {formData.topic === 'Other' && (
              <div className="col-md-6">
                <label className="form-label">Custom Topic *</label>
                <input
                  type="text"
                  className="form-control"
                  name="customTopic"
                  value={formData.customTopic}
                  onChange={handleChange}
                  required
                />
              </div>
            )}

            {/* Priority */}
            <div className="col-md-6">
              <label className="form-label">Priority</label>
              <select
                className="form-select"
                name="priority"
                value={formData.priority}
                onChange={handleChange}
              >
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
              </select>
            </div>

            {/* Preferred Date */}
            <div className="col-md-6">
              <label className="form-label">Preferred Date</label>
              <input
                type="date"
                className="form-control"
                name="preferredDate"
                value={formData.preferredDate}
                onChange={handleChange}
              />
            </div>

            {/* Objective */}
            <div className="col-12">
              <label className="form-label">Training Objective *</label>
              <textarea
                className="form-control"
                rows="4"
                name="objective"
                value={formData.objective}
                onChange={handleChange}
                placeholder="Describe the objective..."
                required
              ></textarea>
            </div>

            {/* Buttons */}
            <div className="col-12 d-flex justify-content-end gap-2">
              <button
                type="button"
                className="btn btn-outline-secondary"
                onClick={handleReset}
              >
                Reset
              </button>
              <button type="submit" className="btn btn-primary">
                Submit Request
              </button>
            </div>
          </div>
        </form>
      </div>

      {/* Submitted Requests Table */}
      <div className="card shadow p-4">
        <h4 className="mb-3 fw-bold">Submitted Training Requests</h4>
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
                  <th>Action</th>
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
                      <button
                        className="btn btn-sm btn-danger"
                        onClick={() => handleDelete(req.id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default SubmitRequest;
