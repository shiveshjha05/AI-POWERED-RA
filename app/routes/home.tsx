import { useEffect } from "react";
import { useNavigate } from "react-router";
import { usePuterStore } from "~/lib/puter";
import Navbar from "~/components/Navbar";
import type { Route } from "./+types/home";
import { resumes } from "../../constants";
import ResumeCard from "~/components/ResumeCard";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "ResumeLens" },
    { name: "description", content: "AI-powered resume analysis for better job opportunities!" },
  ];
}

export default function Home() {
  const { isLoading, auth } = usePuterStore(); 
  const navigate = useNavigate();

  useEffect(() => {
    if(!auth.isAuthenticated) navigate('/auth?next=/');
  }, [auth.isAuthenticated])
  return <main className="bg-[url('/images/bg-main.svg')] bg-cover"> 
  <Navbar />
    <section className="main-section">
      <div className="page-heading py-16">
        <h1>Track your applications & Resume Ratings</h1>
        <h2>Optimize your resume with AI and keep your entire job search organized.</h2>
      </div>
      {resumes.length > 0 && (
        <div className="resumes-section">
          {resumes.map((resume) => (
            <ResumeCard key={resume.id} resume={resume} />
          ))}
        </div>
      )}
    </section>
  </main>;
}
