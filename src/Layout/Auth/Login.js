import React from "react";
import { Box, FormControl } from "@mui/material";
import axios from "axios";
import request from "../../utils/request";
import { localUserInfo, useAuth } from "../../context/auth-context";
import * as passport from "../../api/passport";
import { loginLocal } from "../../utils/auth";

function Index(props) {
  const { user, setUser } = useAuth();
  // console.log(user);
  const handleSubmit = (event) => {
    event.preventDefault();
    const username = event.currentTarget.elements[0].value;
    const password = event.currentTarget.elements[1].value;
    const data = { emailAddr: username, loginToken: password };
    passport.login(data).then((res) => {
      if (res.code === 20002) {
        console.log("Wrong Email");
      } else {
        const userInfo = res.data;
        console.log(userInfo);
        // loginLocal(userInfo).then(() => {
        //   setUser(JSON.parse(userInfo));
        // });
      }
    });
  };
  return (
    <Box>
      {user ? (
        <Box>
          <div>{user.userId}</div>
          <div>{user.lastName}</div>
          <div>{user.avatar}</div>
        </Box>
      ) : null}

      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">用户名</label>
          <input type="text" id={"username"} />
        </div>
        <div>
          <label htmlFor="password">密码</label>
          <input type="password" id={"password"} />
        </div>
        <button type={"submit"}>登录</button>
      </form>
    </Box>
  );
}

export default Index;
