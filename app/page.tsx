import { MainNav } from "@/components/main-nav";
import { Brand } from "@/components/brand";
import { Footer } from "@/components/footer";
import Search from "@/components/search";
import { Intro } from "@/components/intro";
import Services from "@/components/services";

export default function Home() {
    return (
        <>
            <div className="hidden flex-col md:flex sm:grid">
                <div className="border-b">
                    <div className="flex h-16 items-center px-4 fixed border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 top-0 w-full z-50">
                        <Brand title="Magic Post" />
                        <MainNav className="mx-6" />
                        <div className="ml-auto flex items-center space-x-4"></div>
                    </div>
                </div>
                <div className="flex-1 space-y-4 pt-6">
                    <Intro />
                    <Services />
                    <Search />
                </div>
                <Footer></Footer>
            </div>
        </>
    );
}
