import { NavbarShell } from "@/components/navbar/NavbarShell";
import { NavInteractive } from "@/components/navbar/NavInteractive";
import woofDogsLogo from "@/assets/woof-dogs-logo.webp";

export function Navbar() {
  return (
    <>
      <NavbarShell>
        <div className="container h-16">
          <div className="flex h-full items-center justify-between">
            <div className="flex items-center gap-3">
              <a href="/" className="flex items-center" aria-label="Woof Dogs — home">
                <img
                  src={woofDogsLogo.src}
                  alt="Woof Dogs — Professional Dog Training in South Florida"
                  className="h-[46px] w-auto"
                  width={138}
                  height={46}
                  decoding="async"
                  fetchPriority="high"
                  data-testid="icon-logo"
                />
              </a>
            </div>
            <NavInteractive />
          </div>
        </div>
      </NavbarShell>
      <div className="h-16"></div>
    </>
  );
}
