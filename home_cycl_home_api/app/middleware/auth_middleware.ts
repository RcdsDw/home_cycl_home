import type { HttpContext } from '@adonisjs/core/http'
import type { NextFn } from '@adonisjs/core/types/http'
import type { Authenticators } from '@adonisjs/auth/types'

export default class AuthMiddleware {
  redirectTo = '/api/v1/auth/login'

  async handle(
    ctx: HttpContext,
    next: NextFn,
    options: { guards?: (keyof Authenticators)[] } = {}
  ) {
    try {
      // Utilise les guards (par défaut, "api")
      await ctx.auth.authenticateUsing(options.guards || ['api'])
      // Continue vers la route suivante si authentifié
      await next()
    } catch {
      // Redirige vers la route de connexion en cas d'erreur
      return ctx.response.redirect(this.redirectTo)
    }
  }
}
