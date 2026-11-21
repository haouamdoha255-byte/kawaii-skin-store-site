import {
  Link,
  useRouter,
  type ErrorComponentProps,
} from '@tanstack/react-router'
import { Button } from '@/components/ui/button'
import { useLang } from '@/lib/i18n'

const copy = {
  fr: {
    notFound: 'Page introuvable',
    notFoundText: 'Cette page n’existe pas. Vérifiez l’adresse ou revenez à l’accueil.',
    home: 'Retour à l’accueil',
    error: 'Cette page n’a pas pu se charger',
    errorText: 'Veuillez réessayer, ou revenir à l’accueil.',
    retry: 'Réessayer',
  },
  ar: {
    notFound: 'الصفحة غير موجودة',
    notFoundText: 'هذه الصفحة غير موجودة. تحقّقي من العنوان أو عودي إلى الصفحة الرئيسية.',
    home: 'العودة إلى الرئيسية',
    error: 'تعذّر تحميل هذه الصفحة',
    errorText: 'يرجى المحاولة مرة أخرى، أو العودة إلى الصفحة الرئيسية.',
    retry: 'إعادة المحاولة',
  },
}

export function NotFoundPage() {
  const c = copy[useLang()]
  return (
    <main className="grid min-h-svh place-items-center px-6 py-16">
      <div className="max-w-md space-y-6 text-center">
        <p className="text-sm font-medium text-muted-foreground">404</p>
        <h1 className="text-4xl text-foreground">{c.notFound}</h1>
        <p className="text-muted-foreground">{c.notFoundText}</p>
        <Button asChild className="rounded-full">
          <Link to="/">{c.home}</Link>
        </Button>
      </div>
    </main>
  )
}

export function RouteErrorPage({ reset }: ErrorComponentProps) {
  const router = useRouter()
  const c = copy[useLang()]

  return (
    <main className="grid min-h-svh place-items-center px-6 py-16">
      <div className="max-w-md space-y-6 text-center">
        <h1 className="text-4xl text-foreground">{c.error}</h1>
        <p role="alert" className="text-muted-foreground">
          {c.errorText}
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          <Button
            onClick={() => {
              void router.invalidate()
              reset()
            }}
          >
            {c.retry}
          </Button>
          <Button variant="outline" asChild>
            <a href="/">{c.home}</a>
          </Button>
        </div>
      </div>
    </main>
  )
}
