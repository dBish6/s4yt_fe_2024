import type { Dispatch } from "redux";

import { useState } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import checkValidity from "@utils/forms/checkValidity";
import checkValidEmail from "@root/utils/forms/checkValidEmail";

import useRefreshReduxPersister from "@root/hooks/useRefreshReduxPersister";

import { loginPlayer } from "@actions/user";

import Layout from "@components/partials/layout";
import Header from "@components/partials/header";
import Content from "@components/partials/content";
import Input from "@components/forms/controls/Input";
import DemoDisclaimerModal from "@components/modals/demoDisclaimer";

import s from "./styles.module.css";

interface Props {
  userToken: string | undefined;
  loginPlayer: (
    userData: LoginFormData,
    setForm: React.Dispatch<React.SetStateAction<{ processing: boolean }>>
  ) => Promise<void>;
}

interface LoginFormData {
  email: string;
  password: string;
}

const Login: React.FC<Props> = ({ loginPlayer }) => {
  const [form, setForm] = useState({ processing: false }),
    [currentData, _] = useState<LoginFormData>({
      email: "tester@test.ca",
      password: "David123$"
    });

  useRefreshReduxPersister();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const fields =
      document.querySelectorAll<HTMLInputElement>("#loginForm input");
    let valid = true;

    for (let i = 0; i < fields.length; i++) {
      const field = fields[i];
      if (field.name === "player_id") checkValidEmail(field);
      else checkValidity(field);

      if (!field.validity.valid && valid) valid = false;
    }

    if (valid) {
      setForm((prev) => ({ ...prev, processing: true }));
      await loginPlayer(currentData, setForm);
    }
  };

  return (
    <>
      <Layout style={{ position: "relative", maxWidth: "600px" }}>
        <Header title="Login" />
        <Content addCoins="coins1">
          <Link className={`${s.resend} fade move`} to="/register/verify-email">
            Resend Verification Email?
          </Link>

          <form
            id="loginForm"
            onSubmit={(e) => handleSubmit(e)}
            className={s.form}
            autoComplete="off"
            noValidate
          >
            <div role="presentation">
              <label htmlFor="email">Email</label>
              <Input
                id="email"
                name="email"
                type="email"
                errorMsg="Not a valid email address"
                value={currentData.email}
                disabled
                autoComplete="off"
                required
              />
            </div>

            <div role="presentation">
              <label htmlFor="password" aria-label="Password">
                Pass
              </label>
              <Input
                id="password"
                name="password"
                type="password"
                value={currentData.password}
                disabled
                autoComplete="off"
                minLength={8}
                maxLength={24}
                required
              />
            </div>

            <div role="presentation">
              <Link to="/login/forgot" className={`${s.forgot} fade move`}>
                Forgot pass?
              </Link>
            </div>

            <div role="presentation">
              <button type="submit" className="okBtn" disabled={form.processing} />
            </div>
          </form>
          <Link className="fade" to="/register" />
        </Content>
        <a
          href="http://building-u.com/wp-content/uploads/Privacy-Notice.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className={`${s.privacy} privacy fade move`}
        >
          Privacy Policy
        </a>
      </Layout>

      <DemoDisclaimerModal />
    </>
  );
};

const mapDispatchToProps = (dispatch: Dispatch<any>) => ({
  loginPlayer: (
    userData: LoginFormData,
    setForm: React.Dispatch<React.SetStateAction<{ processing: boolean }>>
  ) => dispatch(loginPlayer(userData, setForm) as unknown) as Promise<void>
});

export default connect(null, mapDispatchToProps)(Login);
