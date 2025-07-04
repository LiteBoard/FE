import Image, { type ImageProps } from "next/image";
import { Button } from "@repo/ui/button";

type Props = Omit<ImageProps, "src"> & {
  srcLight: string;
  srcDark: string;
};

const ThemeImage = (props: Props) => {
  const { srcLight, srcDark, ...rest } = props;

  return (
    <>
      <Image {...rest} src={srcLight} className="imgLight" />
      <Image {...rest} src={srcDark} className="imgDark" />
    </>
  );
};

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-secondary-50 dark:from-primary-950 dark:to-secondary-950">
      <main className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <ThemeImage
            className="mx-auto mb-8 animate-fade-in"
            srcLight="turborepo-dark.svg"
            srcDark="turborepo-light.svg"
            alt="Turborepo logo"
            width={180}
            height={38}
            priority
          />
          
          <h1 className="text-4xl font-bold text-primary-900 dark:text-primary-100 mb-6 animate-slide-up">
            Welcome to LiteBoard
          </h1>
          
          <p className="text-lg text-secondary-700 dark:text-secondary-300 mb-8 animate-slide-up">
            A modern monorepo built with Turborepo and Tailwind CSS
          </p>
        </div>

        <div className="max-w-2xl mx-auto mb-12">
          <div className="bg-white dark:bg-secondary-800 rounded-2xl shadow-soft p-8 mb-8 animate-scale-in">
            <h2 className="text-2xl font-semibold text-primary-800 dark:text-primary-200 mb-4">
              Getting Started
            </h2>
            <ol className="space-y-3 text-secondary-700 dark:text-secondary-300">
              <li className="flex items-start">
                <span className="bg-primary-100 dark:bg-primary-900 text-primary-800 dark:text-primary-200 rounded-full w-6 h-6 flex items-center justify-center text-sm font-medium mr-3 mt-0.5">
                  1
                </span>
                Get started by editing <code className="bg-secondary-100 dark:bg-secondary-700 px-2 py-1 rounded text-sm font-mono">apps/web/app/page.tsx</code>
              </li>
              <li className="flex items-start">
                <span className="bg-primary-100 dark:bg-primary-900 text-primary-800 dark:text-primary-200 rounded-full w-6 h-6 flex items-center justify-center text-sm font-medium mr-3 mt-0.5">
                  2
                </span>
                Save and see your changes instantly.
              </li>
            </ol>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
          <a
            className="inline-flex items-center px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white font-medium rounded-xl shadow-medium hover:shadow-large transition-all duration-200 animate-scale-in"
            href="https://vercel.com/new/clone?demo-description=Learn+to+implement+a+monorepo+with+a+two+Next.js+sites+that+has+installed+three+local+packages.&demo-image=%2F%2Fimages.ctfassets.net%2Fe5382hct74si%2F4K8ZISWAzJ8X1504ca0zmC%2F0b21a1c6246add355e55816278ef54bc%2FBasic.png&demo-title=Monorepo+with+Turborepo&demo-url=https%3A%2F%2Fexamples-basic-web.vercel.sh%2F&from=templates&project-name=Monorepo+with+Turborepo&repository-name=monorepo-turborepo&repository-url=https%3A%2F%2Fgithub.com%2Fvercel%2Fturborepo%2Ftree%2Fmain%2Fexamples%2Fbasic&root-directory=apps%2Fdocs&skippable-integrations=1&teamSlug=vercel&utm_source=create-turbo"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              className="mr-2"
              src="/vercel.svg"
              alt="Vercel logomark"
              width={20}
              height={20}
            />
            Deploy now
          </a>
          <a
            href="https://turborepo.com/docs?utm_source"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-6 py-3 bg-secondary-100 hover:bg-secondary-200 dark:bg-secondary-700 dark:hover:bg-secondary-600 text-secondary-800 dark:text-secondary-200 font-medium rounded-xl shadow-soft hover:shadow-medium transition-all duration-200 animate-scale-in"
          >
            Read our docs
          </a>
        </div>
        
        <div className="text-center mb-12">
          <Button appName="web" className="bg-secondary-100 hover:bg-secondary-200 dark:bg-secondary-700 dark:hover:bg-secondary-600 text-secondary-800 dark:text-secondary-200 font-medium rounded-xl shadow-soft hover:shadow-medium transition-all duration-200">
            Open alert
          </Button>
        </div>
      </main>
      
      <footer className="border-t border-secondary-200 dark:border-secondary-700 bg-white dark:bg-secondary-800">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col sm:flex-row justify-center items-center gap-6 text-secondary-600 dark:text-secondary-400">
            <a
              href="https://vercel.com/templates?search=turborepo&utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
            >
              <Image
                aria-hidden
                src="/window.svg"
                alt="Window icon"
                width={16}
                height={16}
                className="mr-2"
              />
              Examples
            </a>
            <a
              href="https://turborepo.com?utm_source=create-turbo"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
            >
              <Image
                aria-hidden
                src="/globe.svg"
                alt="Globe icon"
                width={16}
                height={16}
                className="mr-2"
              />
              Go to turborepo.com →
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
