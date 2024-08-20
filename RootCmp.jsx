import { AppHeader } from "./cmps/AppHeader.jsx"
import { App } from "./cmps/App.jsx"

export function RootCmp() {
    return (
        <section className="app main-layout">
            <AppHeader />
            <main>
                <main>
                    <App />
                </main>
            </main>
        </section>
    )
}

