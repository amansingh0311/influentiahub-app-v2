import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { BiMinus } from "react-icons/bi";
import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaLinkedinIn,
  FaYoutube,
  FaTiktok,
  FaPinterest,
} from "react-icons/fa";
import { Button } from "@tremor/react";
import { useSnackbar } from "notistack";
import Tooltip from "@mui/material/Tooltip"; // Import Tooltip from Material-UI

export default function SocialConnectOptions() {
  const [selectedNetworks, setSelectedNetworks] = useState([]);
  const [connectedAccounts, setConnectedAccounts] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar(); // Destructure enqueueSnackbar from useSnackbar

  const socialNetworks = [
    { name: "Facebook", icon: <FaFacebookF /> },
    { name: "Instagram", icon: <FaInstagram /> },
    { name: "Twitter", icon: <FaTwitter /> },
    { name: "LinkedIn", icon: <FaLinkedinIn /> },
    { name: "YouTube", icon: <FaYoutube /> },
    { name: "TikTok", icon: <FaTiktok /> },
    { name: "Pinterest", icon: <FaPinterest /> },
  ];

  const handleNetworkClick = (networkName) => {
    const maxAccountsPerNetwork = 12;
    const existingNetworkCount = connectedAccounts.filter(
      (acc) => acc.network === networkName
    ).length;

    if (existingNetworkCount >= maxAccountsPerNetwork) {
      alert(
        `You can't add more than ${maxAccountsPerNetwork} accounts for ${networkName}.`
      );
      return;
    }

    if (selectedNetworks.includes(networkName)) {
      setConnectedAccounts((prev) => [
        ...prev,
        {
          network: networkName,
          name: `Account ${networkName} ${existingNetworkCount + 1}`,
          avatar: `https://i.pravatar.cc/150?u=${networkName}-${
            existingNetworkCount + 1
          }`, // Dummy avatar URL
        },
      ]);
    } else {
      setSelectedNetworks((prev) => [...prev, networkName]);
      setConnectedAccounts((prev) => [
        ...prev,
        {
          network: networkName,
          name: `Account ${networkName} 1`,
          avatar: `https://i.pravatar.cc/150?u=${networkName}-1`, // Dummy avatar URL
        },
      ]);
    }
  };

  const handleRemoveAccount = (accountIndex) => {
    const updatedAccounts = connectedAccounts.filter(
      (_, index) => index !== accountIndex
    );
    setConnectedAccounts(updatedAccounts);

    const networksWithAccounts = updatedAccounts.map((acc) => acc.network);
    setSelectedNetworks(networksWithAccounts);
  };

  const handleSkip = () => {
    navigate("/dashboard");
  };

  const handleContinue = () => {
    if (connectedAccounts.length === 0) {
      enqueueSnackbar("Please add at least one account to continue", {
        variant: "error",
      });
      return;
    }

    setLoading(true);
    setTimeout(() => {
      navigate("/dashboard");
    }, 2000); // Simulate loading delay
  };

  return (
    <div className="py-[30px] px-[20px] 400sm:px-[50px] flex justify-start 610sm:justify-between flex-col min-h-[100vh]">
      <div>
        <div className="text-[#6c7ee8] font-medium">Step 3 of 3</div>
        <div className="mt-2 flex gap-4">
          <div className="w-[33.3333333333%] rounded-lg border-4 border-[#6c7ee8]"></div>
          <div className="w-[33.3333333333%] rounded-lg border-4 border-[#7e91ff]"></div>
          <div className="w-[33.3333333333%] rounded-lg border-4 border-[#7e91ff]"></div>
        </div>
        <div className="mt-4 text-[20px] 1019sm:text-[27px] font-normal">
          Let&apos;s add some{" "}
          <span className="text-[#DD2D75] font-bold">social accounts</span>
        </div>
        <div className="mt:[10px] 1019sm:mt-[50px]">
          <div className="text-[14px] 1019sm:text-[16px] font-semibold">
            Choose a social network to add an account
          </div>

          <div className="flex flex-wrap gap-4 mt-[20px]">
            {socialNetworks.map((network, index) => (
              <div
                key={index}
                className="group border px-3 py-2 min-w-full 530sm:min-w-[200px] rounded-md flex justify-between items-center gap-2 cursor-pointer hover:border-[#2C4BFF] hover:border-l-[5px] hover:pl-6 transition-all duration-200"
                onClick={() => handleNetworkClick(network.name)}
              >
                <div className="flex items-center gap-2 group-hover:text-[#2C4BFF]">
                  {network.icon}
                  <div className="text-[14px] group-hover:text-[#2C4BFF]">
                    {network.name}
                  </div>
                </div>
                <div>
                  {selectedNetworks.includes(network.name) && (
                    <div className="flex items-center gap-2">
                      <Tooltip title="Add More Accounts" placement="top">
                        <button
                          className="flex justify-center items-center text-[#4b4b4b] group-hover:text-[#2C4BFF] text-[11px] "
                          onClick={(e) => {
                            e.stopPropagation();
                            handleNetworkClick(network.name);
                          }}
                        >
                          Add More
                        </button>
                      </Tooltip>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
        {connectedAccounts.length > 0 && (
          <div className="mt-[20px]">
            <div className="text-[16px] font-semibold">
              Connected Accounts Details
            </div>
            <div className="flex flex-wrap gap-4 mt-4">
              {connectedAccounts.map((account, index) => (
                <div
                  key={`${account.network}-${index}`}
                  className="flex min-w-full 530sm:min-w-[200px] items-center gap-3 border px-3 py-2 rounded-md relative"
                >
                  <div className="h-10 w-10 rounded-full bg-gray-200">
                    <img
                      src={account.avatar}
                      alt={`${account.name} avatar`}
                      className="h-full w-full object-cover rounded-full"
                    />
                  </div>
                  <div>
                    <div className="text-[14px] font-medium">
                      {account.name}
                    </div>
                    <div className="text-[12px] text-gray-500">
                      {account.network} account added
                    </div>
                  </div>
                  <Tooltip title="Remove Account" placement="top">
                    <button
                      className="right-[10px] absolute  top-[18px] 530sm:top-[-7px] border bg-[#fff] border-red-500 rounded-full  530sm:right-[-7px] text-red-500"
                      onClick={() => handleRemoveAccount(index)}
                    >
                      <BiMinus />
                    </button>
                  </Tooltip>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="flex justify-center items-center gap-[30px] flex-wrap mt-8">
        <button
          className="text-[14px] text-[#535353] flex items-center cursor-pointer"
          onClick={handleSkip}
          disabled={loading}
        >
          Skip
        </button>

        <div className="flex justify-center">
          <Button
            variant="primary"
            className="common-button"
            onClick={handleContinue}
            loading={loading}
          >
            Continue
          </Button>
        </div>
      </div>
    </div>
  );
}
