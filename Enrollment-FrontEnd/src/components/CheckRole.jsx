import { AdminDashboardPage } from "../pages/AdminDashboardPage";
import { ParentDashboardPage } from "../pages/ParentDashboardPage";

export const CheckRole = () => {
    const userRole = localStorage.getItem('user_role');

    if (userRole === 'admin') return <AdminDashboardPage />;
    if (userRole === 'parent') return <ParentDashboardPage />;

    return <div>Unauthorized or loading...</div>;
}