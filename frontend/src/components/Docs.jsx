import { Card, CardContent } from "@/components/ui/card";

const Documentation = () => {
  return (
    <div className="min-h-screen bg-black flex justify-center items-center pt-20">
      <Card className="max-w-4xl w-full bg-white/10 backdrop-blur-md shadow-2xl border border-white/20 rounded-2xl">
        <CardContent className="p-8 space-y-6 text-white">
          <h1 className="text-4xl font-extrabold text-blue-400">
            📌 User Authentication
          </h1>
          <p className="text-lg text-gray-300">
            Users must sign up or log in to access platform features.
            Authentication is securely handled with JWT tokens.
          </p>

          <section className="space-y-4">
            <h2 className="text-3xl font-semibold text-blue-300">
              🚀 Sign-Up Process
            </h2>
            <ul className="list-disc list-inside text-gray-300">
              <li>Users provide their username, email, and password.</li>
              <li>Passwords are securely hashed before storage.</li>
              <li>A verification email is sent for validation.</li>
              <li>Upon success, users are redirected to their dashboard.</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-3xl font-semibold text-blue-300">
              🔐 Login Process
            </h2>
            <ul className="list-disc list-inside text-gray-300">
              <li>Users enter their email and password.</li>
              <li>If valid, an authentication token is issued.</li>
              <li>The token is stored in cookies or local storage.</li>
              <li>Users are redirected to the homepage.</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-3xl font-semibold text-blue-300">
              📤 Deploy Code
            </h2>
            <p>Users can deploy code snippets for others to use.</p>
            <ol className="list-decimal list-inside text-gray-300 space-y-1">
              <li>Navigate to the "Deploy Code" section.</li>
              <li>Enter project details & code snippet.</li>
              <li>Click "Deploy" to make the code public.</li>
              <li>It will be listed on the public Code Repository.</li>
            </ol>
          </section>

          <section className="space-y-4">
            <h2 className="text-3xl font-semibold text-blue-300">
              🛠 UI Libraries Used
            </h2>
            <ul className="list-disc list-inside text-gray-300">
              <li>
                <span className="text-blue-400">shadcn/ui</span> - Buttons,
                forms, and styling
              </li>
              <li>
                <span className="text-blue-400">lucide-react</span> - Icons
              </li>
              <li>
                <span className="text-blue-400">sonner</span> - Notifications
              </li>
              <li>
                <span className="text-blue-400">tailwindcss</span> - Styling
              </li>
            </ul>
          </section>

          <footer className="text-gray-400 text-center text-sm mt-6">
            Built using <span className="text-blue-300">shadcn/ui</span>,
            TailwindCSS, and more for the best experience. 🚀
          </footer>
        </CardContent>
      </Card>
    </div>
  );
};

export default Documentation;
