import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";

import appCss from "../styles.css?url";
import logoUrl from "@/assets/logo.png";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { AdminProvider } from "@/contexts/AdminContext";
import { AdminPanel } from "@/components/admin/AdminPanel";

function NotFoundComponent() {
  return (
    <div className="flex min-h-dvh items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="font-display text-7xl font-bold text-primary">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:opacity-90"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();

  return (
    <div className="flex min-h-dvh items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          This page didn't load
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Something went wrong. Please try again or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:opacity-90"
          >
            Try again
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground hover:bg-accent"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },

      {
        title: "Government Polytechnic Anakapalli | Official Website",
      },

      {
        name: "description",
        content:
          "Official website of Government Polytechnic Anakapalli. Diploma programs, departments, faculty, placements, scholarships, notices, library services and student support.",
      },

      {
        name: "keywords",
        content:
          "Government Polytechnic Anakapalli, Polytechnic College Andhra Pradesh, Diploma Engineering, CME, ECE, Polytechnic Admissions, SBTET Andhra Pradesh",
      },

      {
        name: "author",
        content: "Government Polytechnic Anakapalli",
      },

      {
        name: "robots",
        content: "index, follow",
      },

      {
        property: "og:title",
        content: "Government Polytechnic Anakapalli",
      },

      {
        property: "og:description",
        content:
          "Official website of Government Polytechnic Anakapalli. Admissions, departments, faculty, placements, scholarships and student services.",
      },

      {
        property: "og:type",
        content: "website",
      },

      {
        property: "og:site_name",
        content: "Government Polytechnic Anakapalli",
      },

      {
        property: "og:url",
        content: "https://govtpolytechnicanakapalli.ac.in",
      },

      {
        property: "og:image",
        content: "https://govtpolytechnicanakapalli.ac.in/og-image.jpg",
      },

      {
        name: "twitter:card",
        content: "summary_large_image",
      },

      {
        name: "twitter:title",
        content: "Government Polytechnic Anakapalli",
      },

      {
        name: "twitter:description",
        content:
          "Official website of Government Polytechnic Anakapalli.",
      },

      {
        name: "twitter:image",
        content: "https://govtpolytechnicanakapalli.ac.in/og-image.jpg",
      },
    ],

    links: [
      { rel: "stylesheet", href: appCss },

      {
        rel: "canonical",
        href: "https://govtpolytechnicanakapalli.ac.in",
      },

      { rel: "icon", type: "image/png", href: logoUrl },
      { rel: "apple-touch-icon", href: logoUrl },

      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      {
        rel: "preconnect",
        href: "https://fonts.gstatic.com",
        crossOrigin: "anonymous",
      },

      {
        rel: "stylesheet",
        href:
          "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Poppins:wght@500;600;700;800&display=swap",
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-IN">
      <head>
        <HeadContent />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "CollegeOrUniversity",
              name: "Government Polytechnic Anakapalli",
              url: "https://govtpolytechnicanakapalli.ac.in",
              logo: "https://govtpolytechnicanakapalli.ac.in/logo.png",
              address: {
                "@type": "PostalAddress",
                addressLocality: "Anakapalli",
                addressRegion: "Andhra Pradesh",
                addressCountry: "IN",
              },
            }),
          }}
        />
      </head>
      <body className="antialiased">
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      <AdminProvider>
        <div className="flex min-h-dvh flex-col">
          <Header />
          <main className="flex-1">
            <Outlet />
          </main>
          <Footer />
        </div>
        {import.meta.env.DEV && <AdminPanel />}
      </AdminProvider>
    </QueryClientProvider>
  );
}