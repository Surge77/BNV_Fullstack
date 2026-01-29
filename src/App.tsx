import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Layout } from "./components/layout/Layout";
import { UserListPage } from "./pages/users/UserListPage";
import { AddUserPage } from "./pages/users/AddUserPage";
import { EditUserPage } from "./pages/users/EditUserPage";
import { ViewUserPage } from "./pages/users/ViewUserPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/users" replace />} />
          <Route element={<Layout />}>
            <Route path="/users" element={<UserListPage />} />
            <Route path="/users/add" element={<AddUserPage />} />
            <Route path="/users/edit/:id" element={<EditUserPage />} />
            <Route path="/users/view/:id" element={<ViewUserPage />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
