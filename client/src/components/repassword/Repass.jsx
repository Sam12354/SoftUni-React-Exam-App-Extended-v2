import { useState } from "react";
import { changePassword } from "../../api/changePass-api";

export default function ChangePassword() {
    const [oldPass, setOldPass] = useState("");
    const [newPass, setNewPass] = useState("");
    const [repeatPass, setRepeatPass] = useState("");
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const [loading, setLoading] = useState(false);

    const onSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setSuccess(null);

        if (newPass !== repeatPass) {
            setError("New passwords do not match");
            return;
        }

        setLoading(true);
        try {
            await changePassword(oldPass, newPass);
            setSuccess("Password changed successfully");
            setOldPass("");
            setNewPass("");
            setRepeatPass("");
        } catch (err) {
            setError(err.message || "Failed to change password");
        } finally {
            setLoading(false);
        }
    };

    return (
        <section
            className="page-section bg-light d-flex align-items-center justify-content-center min-vh-100 py-5"
            style={{ background: "url('/images/header-bg.jpg') center/cover no-repeat" }}
        >
            <div className="container pt-5">
                <div className="text-center">
                    <h2 className="section-heading text-uppercase" style={{ color: "#ffc800" }}>
                        Change Password
                    </h2>
                </div>
                <div className="row justify-content-center">
                    <div className="col-12 col-md-6 col-lg-5">
                        <div className="card shadow p-4 bg-white">
                            {error && (
                                <div className="alert alert-danger text-center mb-3">
                                    {error}
                                </div>
                            )}
                            {success && (
                                <div className="alert alert-success text-center mb-3">
                                    {success}
                                </div>
                            )}
                            <form onSubmit={onSubmit}>
                                <div className="mb-3">
                                    <label htmlFor="oldPass" className="form-label">
                                        Old Password
                                    </label>
                                    <input
                                        type="password"
                                        className={`form-control ${error ? 'error' : ''}`}
                                        id="oldPass"
                                        value={oldPass}
                                        onChange={(e) => setOldPass(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="newPass" className="form-label">
                                        New Password
                                    </label>
                                    <input
                                        type="password"
                                        className={`form-control ${error ? 'error' : ''}`}
                                        id="newPass"
                                        value={newPass}
                                        onChange={(e) => setNewPass(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="repeatPass" className="form-label">
                                        Repeat New Password
                                    </label>
                                    <input
                                        type="password"
                                        className={`form-control ${error ? 'error' : ''}`}
                                        id="repeatPass"
                                        value={repeatPass}
                                        onChange={(e) => setRepeatPass(e.target.value)}
                                        required
                                    />
                                </div>

                                <button type="submit" className="btn btn-primary w-100" disabled={loading}>
                                    {loading ? "Changing..." : "Change Password"}
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}