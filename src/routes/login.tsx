import { useNavigate, useSearchParams } from "@solidjs/router";
import { createSignal, onSettled } from "solid-js";
import { AuthWithGoogle, login, refreshUser, user } from "../lib/auth";
import { Spinner } from "../components/Spinner";

export default function Login() {

    const navigate = useNavigate()
    const [loading, setLoading] = createSignal(false);
    const [error, setError] = createSignal<string | null>(null);
    let emailRef!: HTMLInputElement;
    let passwordRef!: HTMLInputElement;
    const [params] = useSearchParams();

    onSettled(() => {
        (async () => {
            await refreshUser()
            if (user()) return navigate("/")
        })()
        if (params.oauth === "failed") {
            setError("Erreur de connexion aec google")
        }
        if (params.oauth === "success") {
            navigate("/")
        }
    })

    const handleSubmit = async (e: SubmitEvent) => {
        e.preventDefault();
        setError(null);
        setLoading(true);

        const err = await login(emailRef.value, passwordRef.value);

        setLoading(false);

        if (err) return setError(err);
        navigate("/", { replace: true });
    }

    return (
        <main>
            <form class="centerContent" onSubmit={handleSubmit}>
                <h1>Connexion</h1>
                <input type="email" class="form" placeholder="Email" ref={emailRef} />
                <input type="password" class="form" placeholder="Mot de passe" ref={passwordRef} />
                {error() && <p class="error">{error()}</p>}
                <button class="form">
                    Se connecter
                </button>
                {loading() && <Spinner />}

                <p>Ou avec :</p>

                <button
                    class="form"
                    style={{
                        width: "50px",
                    }}
                    onClick={AuthWithGoogle}
                    type="button"
                >
                    <img src="/google.svg" alt="G" />
                </button>
            </form>
        </main>
    );
}
