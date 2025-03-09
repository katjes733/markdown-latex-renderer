import ChatBot, { Flow, Params, Settings } from "react-chatbotify";

import RcbPlugin from "./factory/RcbPluginFactory";
import { MarkdownLatexRendererBlock } from "./types/MarkdownLatexRendererBlock";
import MarkdownLatexWrapper from "./components/MarkdownLatexWrapper";

const mdLatexText = `
### Markdown with LaTeX

#### Example 1 with \`$\` delimiter

Given a **formula** below
$$
s = ut + \\frac{1}{2}at^{2}
$$
Calculate the value of $s$ when $u = 10\\frac{m}{s}$ and $a = 2\\frac{m}{s^{2}}$ at $t = 1s$

#### Example 2 with \`[\`, \`]\`, \`(\` and \`)\` delimiters

The area \\( A \\) of a circle is given by the formula:

\\[ A = \\pi r^2 \\]

where \\( r \\) is the radius of the circle. For a circle with a radius of 5, we substitute \\( r = 5 \\) into the formula:

\\[ A = \\pi (5)^2 \\]
\\[ A = \\pi \\times 25 \\]
\\[ A = 25\\pi \\]

Therefore, the area of the circle is:

\\[ \\boxed{25\\pi} \\]
`;

const App = () => {
  const settings: Settings = {
    general: {
      embedded: true,
    },
    header: {
      title: (
        <div
          style={{
            cursor: "pointer",
            margin: 0,
            fontSize: 20,
            fontWeight: "bold",
          }}
          onClick={() => window.open("https://github.com/katjes733")}
        >
          katjes733
        </div>
      ),
    },
  };

  // initialize the plugin
  const plugins = [RcbPlugin({ markdownLatexComponent: MarkdownLatexWrapper })];

  // example flow for testing
  const flow: Flow = {
    start: {
      message:
        "#### Hello! I'm rendering messages in markdown with latex, you can type to me in markdown with latex too!",
      path: "loop",
      renderMarkdownLatex: ["BOT", "USER"],
    } as MarkdownLatexRendererBlock,
    loop: {
      message: async (params: Params) => {
        await params.injectMessage(mdLatexText);
      },
      chatDisabled: false,
      path: "loop",
      renderMarkdownLatex: ["BOT", "USER"],
    } as MarkdownLatexRendererBlock,
  };

  return (
    <ChatBot
      id="chatbot-id"
      settings={settings}
      plugins={plugins}
      flow={flow}
    ></ChatBot>
  );
};

export default App;
