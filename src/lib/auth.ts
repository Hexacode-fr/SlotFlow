import { createSignal } from "solid-js";
import { AppwriteException, OAuthProvider, type Models } from "appwrite";
import { account } from "./appwrite";

export const [user, setUser] = createSignal<Models.User<Models.Preferences> | null>(null);
export const [authLoading, setAuthLoading] = createSignal(true);

export async function refreshUser() {
  try {
    const response = await account.get();
    setUser(response);
  } catch (e) {
    console.error("account.get failed:", e);
    setUser(null);;
  } finally {
    setAuthLoading(false);
  }
}

export async function login(email: string, password: string): Promise<string | null> {
    try {
        await account.createEmailPasswordSession({ email, password });
        await refreshUser();
        return null;
    } catch (error) {
        if (error instanceof AppwriteException) {
            switch (error.type) {
                case "user_invalid_credentials":
                    return "Email ou mot de passe incorrect.";
                case "user_blocked":
                    return "Ce compte est bloqué.";
                case "general_rate_limit_exceeded":
                    return "Trop de tentatives, réessaie dans un moment.";
                case "user_session_already_exists":
                    await refreshUser();
                    return null;
                default:
                    return error.message;
            }
        }
        return "Impossible de joindre le serveur.";
    }
}

export function AuthWithGoogle() {
    const origin = window.location.origin;

    account.createOAuth2Session({
        provider: OAuthProvider.Google,
        success: `${origin}/login?oauth=success`,
        failure: `${origin}/login?oauth=failed`,
    });
}

