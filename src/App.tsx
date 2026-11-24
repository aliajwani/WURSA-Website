import { Routes, Route } from 'react-router-dom'
import { Navbar } from '@/components/Navbar'
import { Hero } from '@/components/Hero'
import { About } from '@/components/About'
import { Events } from '@/components/Events'
import { Blog } from '@/components/Blog'
import { GetInvolved } from '@/components/GetInvolved'
import { Footer } from '@/components/Footer'
import { MentorMenteePage } from '@/pages/MentorMenteePage'
import { AdminPage } from '@/pages/AdminPage'
import { TeamPage } from '@/pages/TeamPage'
import { EventsPage } from '@/pages/EventsPage'
import { BlogPage } from '@/pages/BlogPage'
import { CustomCursor } from '@/components/CustomCursor'
import { ScrollToTop } from '@/components/ScrollToTop'

function App() {
  return (
    <>
      <ScrollToTop />
      <CustomCursor />
      <Navbar />
      <main>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Hero />
                <About />
                <Events />
                <Blog preview />
                <GetInvolved />
                <Footer />
              </>
            }
          />
          <Route path="/events" element={<EventsPage />} />
          <Route path="/team" element={<TeamPage />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/mentor-mentee" element={<MentorMenteePage />} />
          <Route path="/admin" element={<AdminPage />} />
        </Routes>
      </main>
    </>
  )
}

export default App
