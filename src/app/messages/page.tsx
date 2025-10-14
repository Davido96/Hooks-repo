import AuthenticatedLayout from "@/components/fans/AuthenticatedLayout";
import MessagePage from "@/components/fans/MessagePage";

export default function Messages() {
  return (
    <AuthenticatedLayout>
      <MessagePage />
    </AuthenticatedLayout>
  );
}
