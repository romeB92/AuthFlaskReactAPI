const getState = ({ getStore, getActions, setStore }) => {
  return {
    store: {
      token: null,
      message: null,
      demo: [
        {
          title: "FIRST",
          background: "white",
          initial: "white",
        },
        {
          title: "SECOND",
          background: "white",
          initial: "white",
        },
      ],
      user_token: null,
    },
    actions: {
      // Use getActions to call a function within a fuction
      exampleFunction: () => {
        getActions().changeColor(0, "green");
      },

      syncTokenFromSessionStorage: () => {
        const token = sessionStorage.getItem("token");
        console.log("Application just loaded, synching the session storage");
        if (token && token !== "" && token !== undefined)
          setStore({
            token: token,
          });
      },
      logout: () => {
        const token = sessionStorage.removeItem("token");
        console.log("Logging Out");
        setStore({ token: null });
      },

      login: async (email, password) => {
        const opts = {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: email,
            password: password,
          }),
        };
        try {
          const resp = await fetch(
            "https://3001-romeb92-authflaskreacta-hqm9ju7k3ns.ws-us101.gitpod.io/api/token",
            opts
          );

          if (resp.status !== 200) {
            alert("There has been an error");
            return false;
          }

          const data = await resp.json();
          sessionStorage.setItem("token", data.access_token);
          console.log("data stored: ", data);
          setStore({ token: data.access_token });
          return true;
        } catch (error) {
          console.error("error logging in");
        }
      },

      getMessage: () => {
        // fetching data from the backend
        const store = getStore();
        const opts = {
          headers: {
            Authorization: "Bearer " + store.token,
          },
        };

        fetch("https://3001-romeb92-authflaskreacta-hqm9ju7k3ns.ws-us101.gitpod.io/api/hello", opts)
          .then((resp) => resp.json())
          .then((data) => setStore({ message: data.message }))
          .catch((error) =>
            console.log("Error loading message from backend", error)
          );
      },
      changeColor: (index, color) => {
        //get the store
        const store = getStore();

        //we have to loop the entire demo array to look for the respective index
        //and change its color
        const demo = store.demo.map((elm, i) => {
          if (i === index) elm.background = color;
          return elm;
        });

        //reset the global store
        setStore({ demo: demo });
      },
      setUser_token: (token) => {
        setStore({ user_token: token });
      },
    },
  };
};

export default getState;
