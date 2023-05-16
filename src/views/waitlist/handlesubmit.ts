import axios from "axios";
import { AddToWaitlistResponse } from "../../dto/waitlist";
import IsValidBusinessMail from "../../helper/emailChecker";
// import { event } from "nextjs-google-analytics";

interface IProps {
  setLoader: (value: React.SetStateAction<boolean>) => void;
  setsentSuccessful: (value: React.SetStateAction<boolean>) => void;
  setshowModalSuccessful: (value: React.SetStateAction<boolean>) => void;
  setShowInvalidEmail: (value: React.SetStateAction<boolean>) => void;
  setEmailAlreadyExist: (value: React.SetStateAction<boolean>) => void;
  setWarningMsg: (value: React.SetStateAction<boolean>) => void;
  setWaitlistData: (value: React.SetStateAction<AddToWaitlistResponse>) => void;
  setWaitlist: (
    value: React.SetStateAction<{
      first_name: string;
      last_name: string;
      email: string;
      company_name: string;
      role: string;
    }>
  ) => void;
  waitlistDto: {
    first_name: string;
    last_name: string;
    email: string;
    company_name: string;
    role: string;
  };
}

export async function WaitlisthandleSubmit(props: IProps) {
  const {
    setLoader,
    setsentSuccessful,
    setshowModalSuccessful,
    setEmailAlreadyExist,
    setWarningMsg,
    setWaitlist,
    waitlistDto,
    setWaitlistData,
    setShowInvalidEmail,
  } = props;

  setLoader(true);
  if (
    waitlistDto.first_name &&
    waitlistDto.last_name &&
    waitlistDto.email &&
    waitlistDto.company_name &&
    waitlistDto.role
  ) {
    if (!IsValidBusinessMail(waitlistDto.email)) {
      setShowInvalidEmail(true);
      setLoader(false);
      setTimeout(() => {
        setShowInvalidEmail(false);
      }, 3500);
      console.log("invalid mail");
      return;
    }
    axios
      .post(`${process.env.NEXT_PUBLIC_SEVER_DOMAIN}/waitlist`, waitlistDto)
      .then((e) => {
        setWaitlist({
          first_name: "",
          last_name: "",
          email: "",
          company_name: "",
          role: "",
        });
        setsentSuccessful(true);
        setWaitlistData(e.data);
        setLoader(false);
        setshowModalSuccessful(true);
        setTimeout(() => {
          setsentSuccessful(false);
          // track/register the form submission on google analytics
          // event("submit_form", {
          //   category: "WaitList",
          //   label: waitlistDto.email,
          // });
        }, 5000);
      })
      .catch((e) => {
        setLoader(false);
        const msg = e.response.data.message;
        if (msg === "Email already exixts") {
          setEmailAlreadyExist(true);
          setTimeout(() => {
            setEmailAlreadyExist(false);
          }, 4000);
        }
      });
  } else {
    setWarningMsg(true);
    setLoader(false);
    setTimeout(() => {
      setWarningMsg(false);
    }, 4000);
  }
  setTimeout(() => {
    setLoader(false);
  }, 8000);
}
