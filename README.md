# CSE Department Website - GEC Sreekrishnapuram

Welcome to the unofficial website of the **Computer Science and Engineering Department** at **GEC Sreekrishnapuram**. This site is designed to provide students, faculty, and visitors with easy access to important information and updates related to the department, fostering a vibrant academic and technical community.

> [!NOTE]
> This is a student-run website and is not officially affiliated with the Department of Computer Science and Engineering, Government Engineering College Palakkad (as of the time of writing this README).

## About the Website
This website is a one-stop destination for all information related to the Computer Science Department of GEC Palakkad. It showcases the department's offerings, and resources while also providing the latest updates on academic activities, events, and opportunities.

Key features include:

- **Department Overview**: A detailed introduction to the department, highlighting our mission, vision, and objectives.
- **Academic Programs**: Information on the various undergraduate and postgraduate programs offered by the department, including the syllabus, curriculum, and admission details.
- **Research and Projects**: Highlights of ongoing research projects, student initiatives, and faculty-led projects in cutting-edge areas of technology.
- **Events & News**: Regular updates on seminars, workshops, guest lectures, and department activities, ensuring that students and visitors stay informed about upcoming events.
- **Resources for Students**: Essential resources such as course materials, academic schedules, exam timetables, and lab access information for the department's students.
- **Achievements and Recognitions**: A showcase of awards, recognitions, and achievements by students and faculty members in the field of computer science and engineering.
- **Gallery**: A vibrant collection of photos and videos from department events, celebrations, and student activities, reflecting the dynamic culture of the department.

## Technologies Used
- **Frontend Framework**: Built using [Next.js](https://nextjs.org/) for a modern, fast, and scalable web experience.
- **Styling**: Tailwind CSS for a fully responsive, user-friendly interface.

## Contribution
We welcome and encourage contributions from students and alumni. If you have suggestions or would like to contribute to the development or content of the website, feel free to open an issue or submit a pull request.

---

## Project Structure

```
cse_dept_site/
│
├── public/                          # Static assets served directly
│   ├── dflip/                       # dFlip PDF viewer library (JS/CSS)
│   ├── dino-files/                  # 404 page dino game scripts
│   ├── dino-images/                 # Dino game sprites
│   ├── blog/                        # Static blog images
│   ├── gallery/                     # Static gallery images
│   ├── images/                      # General images
│   ├── pdf/                         # PDF files
│   ├── ImageScroll/                 # Scroll section images
│   ├── bg.mp4, frontVid.mp4         # Background videos
│   └── *.png, *.jpg, *.svg          # Icons, logos, recruiter images
│
├── src/
│   │
│   ├── app/                         # Next.js App Router — all pages & API
│   │   │
│   │   ├── (withnav)/               # Route group: public pages WITH navbar
│   │   │   ├── layout.js            # Adds Navbar + Footer to all public pages
│   │   │   ├── page.js              # Homepage  →  /
│   │   │   ├── HomePage/            # Homepage section components
│   │   │   │   └── page.jsx
│   │   │   ├── aboutus/             # About the department  →  /aboutus
│   │   │   │   ├── page.jsx
│   │   │   │   └── aboutUsHorizontalScroll/
│   │   │   ├── academics/           # Courses & programs  →  /academics
│   │   │   │   └── page.jsx
│   │   │   ├── people/              # Faculty & staff  →  /people
│   │   │   │   └── page.jsx
│   │   │   ├── achievement/         # Toppers & certificates  →  /achievement
│   │   │   │   ├── page.jsx
│   │   │   │   ├── acheivers/
│   │   │   │   ├── acheiversHorizontalScroll/
│   │   │   │   └── more-acheivers/
│   │   │   ├── activity/            # Student activities  →  /activity
│   │   │   │   ├── page.jsx
│   │   │   │   ├── blog/            # Blog posts  →  /activity/blog
│   │   │   │   ├── events/          # Events  →  /activity/events
│   │   │   │   ├── magazine/        # PDF magazines  →  /activity/magazine
│   │   │   │   │   └── FlipBook.jsx # dFlip PDF viewer component
│   │   │   │   └── student_gp/      # Student groups  →  /activity/student_gp
│   │   │   ├── gallery/             # Photo gallery  →  /gallery
│   │   │   │   └── page.jsx
│   │   │   ├── placements/          # Placement stats  →  /placements
│   │   │   │   └── page.jsx
│   │   │   └── notifications/       # Announcements  →  /notifications
│   │   │
│   │   ├── (admin)/                 # Route group: protected admin CMS
│   │   │   ├── layout.jsx           # Auth guard → redirects to Google OAuth
│   │   │   └── admin/               # All admin pages  →  /admin
│   │   │       ├── page.jsx         # Admin dashboard  →  /admin
│   │   │       ├── faculty/         # Manage faculty  →  /admin/faculty
│   │   │       ├── event/           # Manage events
│   │   │       ├── gallery/         # Manage gallery
│   │   │       ├── blog/            # Manage blog posts
│   │   │       ├── magazine/        # Manage magazines
│   │   │       ├── syllabus/        # Manage syllabi
│   │   │       ├── course/          # Manage courses
│   │   │       ├── subject/         # Manage subjects
│   │   │       ├── topper/          # Manage toppers
│   │   │       ├── poster/          # Manage posters
│   │   │       ├── certificate/     # Manage certificates
│   │   │       ├── recruiter/       # Manage recruiters
│   │   │       ├── student/         # Manage students
│   │   │       ├── studentgroup/    # Manage student groups
│   │   │       ├── associationmembers/
│   │   │       ├── advisorbound/    # Advisory board
│   │   │       ├── facility/        # Labs & facilities
│   │   │       ├── accredition/     # Accreditation info
│   │   │       ├── saved/           # Saved drafts
│   │   │       └── request-status/  # Upload request status
│   │   │
│   │   ├── api/                     # Backend API routes
│   │   │   ├── login/google/        # Initiates Google OAuth  →  /api/login/google
│   │   │   │   └── callback/        # OAuth callback handler
│   │   │   │       └── route.js
│   │   │   ├── logout/              # Clears session cookie  →  /api/logout
│   │   │   │   └── route.js
│   │   │   └── uploadthing/         # File upload handler
│   │   │       ├── core.js          # Upload router & auth middleware
│   │   │       └── route.js         # UploadThing Next.js handler
│   │   │
│   │   ├── academics/               # Static academics info page
│   │   ├── developers/              # Team credits page  →  /developers
│   │   ├── globals.css              # Global base CSS
│   │   ├── layout.js                # Root layout (fonts, providers, toaster)
│   │   └── not-found.js             # Custom 404 page with dino game
│   │
│   ├── components/                  # Reusable UI components
│   │   │
│   │   ├── admin/                   # Admin CMS components
│   │   │   ├── AdminNavbar.jsx      # Admin top navigation bar
│   │   │   ├── Input.jsx            # Shared form input component
│   │   │   ├── ListItem.jsx         # Shared list row component
│   │   │   ├── SubmitButton.jsx     # Form submit button with loading state
│   │   │   └── [section]/           # Per-section form & list components
│   │   │       ├── [Section]Form.jsx    # Create/edit form
│   │   │       └── [Section]List.jsx    # Data table/list view
│   │   │
│   │   ├── ui/                      # Base UI primitives (shadcn/radix)
│   │   │   └── *.jsx                # Button, Toast, Select, etc.
│   │   │
│   │   ├── Navbar.jsx               # Public site navigation
│   │   ├── Footer.jsx               # Footer with contact form (EmailJS)
│   │   ├── DeptLogo.jsx             # Animated mission/vision scroll section
│   │   ├── DeptInfo.jsx             # Department stats and info
│   │   ├── Cardpeople.jsx           # Faculty/staff profile cards
│   │   ├── Gallery.jsx              # Image gallery grid
│   │   ├── HodMessage.jsx           # HOD message section
│   │   ├── History.jsx              # Department history section
│   │   ├── References.jsx           # Related links section
│   │   ├── PlacementGraph.jsx       # Placement stats chart (Chart.js)
│   │   ├── PlacementIntro.jsx       # Placement intro section
│   │   ├── PlacementRecruiters.jsx  # Recruiter logos
│   │   ├── PlacmentStatus.jsx       # Placement status table
│   │   ├── HorizontalScrollCarousel.jsx
│   │   ├── CourseOfferedSection.jsx
│   │   ├── AcadamicsIntro.jsx
│   │   ├── AcadamicsCourses.jsx
│   │   ├── AcadamicsCoursesBtech.jsx
│   │   ├── AcadamicsCoursesMtech.jsx
│   │   ├── AcadamicsLabs.jsx
│   │   ├── AcadamicsPrograms.jsx
│   │   ├── AcadamicsSidebar.jsx
│   │   ├── Contact.jsx              # Contact section
│   │   ├── ColoredSection.jsx       # Layout wrapper for colored sections
│   │   ├── LenisScroll.jsx          # Smooth scroll provider (Lenis)
│   │   ├── QueryProvider.jsx        # TanStack Query client provider
│   │   ├── uploadthing.jsx          # UploadThing component exports
│   │   ├── courses.js               # Static courses data
│   │   ├── data.js                  # Static component data
│   │   ├── horizontal-scroll.js     # Horizontal scroll utility
│   │   └── nooverflow.css           # Overflow CSS override
│   │
│   ├── lib/                         # Core backend utilities
│   │   ├── models/                  # Mongoose data models (21 total)
│   │   │   ├── User.js              # Admin user accounts
│   │   │   ├── Session.js           # Auth session tokens
│   │   │   ├── Faculty.js           # Teaching staff
│   │   │   ├── Student.js           # Student records
│   │   │   ├── Course.js            # Academic courses
│   │   │   ├── Subject.js           # Subjects
│   │   │   ├── Syllabus.js          # Syllabus PDFs
│   │   │   ├── Event.js             # Department events
│   │   │   ├── Blog.js              # Blog posts
│   │   │   ├── Gallery.js           # Gallery images
│   │   │   ├── Magazine.js          # PDF magazines
│   │   │   ├── Poster.js            # Event posters
│   │   │   ├── Certificate.js       # Certificates
│   │   │   ├── Topper.js            # Academic toppers
│   │   │   ├── Recruiter.js         # Placement recruiters
│   │   │   ├── Facility.js          # Labs & facilities
│   │   │   ├── StudentGroup.js      # Student organizations
│   │   │   ├── AssociationMember.js # CSE Association members
│   │   │   ├── AdvisoryBoard.js     # Advisory board members
│   │   │   ├── SuccessStory.js      # Alumni success stories
│   │   │   └── General.js           # Misc content (accreditation, etc.)
│   │   ├── auth.js                  # Google OAuth setup (Arctic)
│   │   ├── session.js               # Session token create/validate/delete
│   │   ├── db.js                    # MongoDB connection (singleton)
│   │   ├── convertRange.js          # Number range conversion utility
│   │   └── utils.js                 # General utilities (cn, etc.)
│   │
│   ├── actions/                     # Next.js Server Actions (18 total)
│   │   ├── faculty.action.js        # Faculty CRUD
│   │   ├── event.action.js          # Events CRUD
│   │   ├── blog.action.js           # Blog CRUD
│   │   ├── gallery.action.js        # Gallery CRUD
│   │   ├── magazine.action.js       # Magazine CRUD
│   │   ├── syllabus.action.js       # Syllabus CRUD
│   │   ├── course.action.js         # Course CRUD
│   │   ├── subject.action.js        # Subject CRUD
│   │   ├── topper.action.js         # Topper CRUD
│   │   ├── poster.action.js         # Poster CRUD
│   │   ├── certificate.action.js    # Certificate CRUD
│   │   ├── recruiter.action.js      # Recruiter CRUD
│   │   ├── student.action.js        # Student CRUD
│   │   ├── studentgroup.action.js   # Student group CRUD
│   │   ├── associationmembers.action.js
│   │   ├── advisoryboard.action.js
│   │   ├── facility.action.js
│   │   └── successstory.action.js
│   │
│   ├── atoms/
│   │   └── navbarAtom.js            # Jotai atom for navbar open/close state
│   │
│   ├── hooks/
│   │   └── use-toast.js             # Toast notification hook
│   │
│   ├── constants/
│   │   ├── DeptConstants.js         # Dept mission, vision text
│   │   └── contents.js              # Static page content (nav items, etc.)
│   │
│   └── data/                        # Static data files
│
├── .env.local                       # Local environment variables (git-ignored)
├── .env.example                     # Environment variable template
├── .gitignore
├── .eslintrc.json                   # ESLint config
├── components.json                  # shadcn/ui component config
├── data.js                          # Root-level static data (to be moved to src/)
├── jsconfig.json                    # JS path aliases (@/ → src/)
├── next.config.mjs                  # Next.js config (transpilePackages)
├── postcss.config.js                # PostCSS config (Tailwind)
├── tailwind.config.js               # Tailwind theme, fonts, plugins
└── package.json                     # Dependencies & npm overrides
```

---

## Environment Variables

Create a `.env.local` file in the project root with the following keys (see `.env.example`):

```env
MONGODB_URI=           # MongoDB Atlas connection string
GOOGLE_CLIENT_ID=      # Google OAuth app client ID
GOOGLE_CLIENT_SECRET=  # Google OAuth app client secret
HOST_NAME=             # e.g. http://localhost:3000
UPLOADTHING_SECRET=    # UploadThing API secret
UPLOADTHING_APP_ID=    # UploadThing app ID
```

## Getting Started

```bash
# Install dependencies
npm install --legacy-peer-deps

# Run development server
npm run dev

# Build for production
npm run build
```

Open [http://localhost:3000](http://localhost:3000) in your browser.
