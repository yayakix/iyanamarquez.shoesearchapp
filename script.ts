const url = "http://localhost:4000";

const data = {
  userId: "1",
  shoeId: "1",
};

const run = async () => {
  const response = await fetch(`${url}/favorite/user/shoe`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
};

run();
