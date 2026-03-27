import { Routes, Route } from 'react-router-dom'
import { Navbar } from '@/components/Navbar'
import { Hero } from '@/components/Hero'
import { About } from '@/components/About'
import { Events } from '@/components/Events'
import { GetInvolved } from '@/components/GetInvolved'
import { Footer } from '@/components/Footer'
import { MentorMenteePage } from '@/pages/MentorMenteePage'
import { AdminPage } from '@/pages/AdminPage'
import { TeamPage } from '@/pages/TeamPage'
import { EventsPage } from '@/pages/EventsPage'
import { CustomCursor } from '@/components/CustomCursor'

function App() {
  return (
    <>
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
                <GetInvolved />
                <Footer />
              </>
            }
          />
          <Route path="/events" element={<EventsPage />} />
          <Route path="/team" element={<TeamPage />} />
          <Route path="/mentor-mentee" element={<MentorMenteePage />} />
          <Route path="/admin" element={<AdminPage />} />
        </Routes>
      </main>
    </>
  )
}

export default App
