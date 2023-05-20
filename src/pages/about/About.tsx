import { Link, Note, Text, useClipboard, useToasts } from "@geist-ui/core";
import { Delete } from "@geist-ui/icons";

const AboutPage = () => {
  const solanaAddress: string = import.meta.env.VITE_SUPPORT_ADDRESS;
  const { setToast } = useToasts();
  const { copy } = useClipboard();

  const handleCopyAddress = async () => {
    copy(solanaAddress);
    setToast({ text: "Address copied to clipboard", type: "success" });
  };

  return (
    <>
      <Text h1>About StarAtlas EV Reward checker</Text>
      <Text>
        This tool is designed for{" "}
        <Link
          href="https://staratlas.com/"
          rel="noreferrer noopener"
          target="_blank"
          underline
          icon
          color
        >
          StarAtlas
        </Link>{" "}
        to help users check and track their collected rewards during the{" "}
        <Link
          href="https://staratlas.com/newsroom/star-atlas-news/star-atlas-revolutionary-technology-reaches-escape-velocity-real-time-fully"
          rel="noreferrer noopener"
          target="_blank"
          underline
          icon
          color
        >
          Escape Velocity
        </Link>{" "}
        test. Simply input your Solana address, which you used for playing
        StarAtlas, into the search bar, and you can instantly view your rewards
        in a table format. This is an opensource project available on{" "}
        <Link
          href="https://github.com/munkacsimark/staratlas-ev-loot-check"
          rel="noreferrer noopener"
          target="_blank"
          underline
          icon
          color
        >
          GitHub
        </Link>
        .
      </Text>
      <Note label={false}>
        <Text h2>Features</Text>
        <ul>
          <li>
            <Text b i>
              CSV download:
            </Text>{" "}
            You can download the data in CSV format by clicking the download
            button located below the table. Currently, the downloaded file will
            contain the same information as shown in the table.
          </li>
          <li>
            <Text b i>
              Auto refresh:
            </Text>{" "}
            By default, this feature is turned on. If enabled, the app will
            refresh the reward list every 30 seconds to keep the information up
            to date.
          </li>
          <li>
            <Text b i>
              Save address:
            </Text>{" "}
            Save Address: If enabled, you can save your Solana address to
            quickly access it. This feature is helpful when you have multiple
            addresses for playing and want to switch between them easily. Please
            note that addresses will only be saved locally on your computer in
            the{" "}
            <code>
              <Link
                href="https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage"
                rel="noreferrer noopener"
                target="_blank"
                underline
                icon
                color
              >
                localStorage
              </Link>
            </code>
            . You can delete them using the delete icon <Delete size={16} /> in
            the dropdown menu located in the search bar.
          </li>
        </ul>
      </Note>
      <Text>
        This is a small project aimed at making our lives easier. Comments and
        feedback are welcome. If you have any feature requests or have found a
        bug, please let me know through my socials or{" "}
        <Link
          href="https://github.com/munkacsimark/staratlas-ev-loot-check/issues"
          rel="noreferrer noopener"
          target="_blank"
          underline
          icon
          color
        >
          by opening an issue
        </Link>{" "}
        on Github.
      </Text>
      <Text>
        If you would like to support me and my future StarAtlas related
        projects, here is my Solana address:{" "}
        <Link href="#" underline color onClick={handleCopyAddress}>
          {solanaAddress}
        </Link>
      </Text>
    </>
  );
};

export default AboutPage;
