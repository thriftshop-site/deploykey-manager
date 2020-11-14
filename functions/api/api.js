if (!process.env.NETLIFY) {
  require("dotenv").config();
}

const { Octokit } = require("@octokit/core");
// create a github user , make it as a collaborator of that repo or
// or outside collaborator on an organization repository granting read write and admin access
// or to a team with access to the repositories it needs to automate.

// in short the user that has access to the repo/s
// can use this function and accept SSH key from Netlify Deploy Keys
const {
  GITHUB_ACCESS_TOKEN,
} = process.env;

if (!GITHUB_ACCESS_TOKEN)
  throw new Error("No Access Token Set");

exports.handler = async (event) => {

 if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: "Method Not Allowed!" }),
      headers: { Allow: "POST" },
    };
  }
  try {
    const octokit = new Octokit({ auth: `${GITHUB_ACCESS_TOKEN}` });
    // make sure your Access token has write:public_key permission

    // Make sure the User is PAID before even using this function
    const { key, title = "" } = JSON.parse(event.body);
    const {data} = await octokit.request('POST /user/keys', {
        key,
        title
    });
    return {
        statusCode: 200,
        body: JSON.stringify({ data })
    }
  } catch (error) {
    // If Key Exist We Need to Throw Error
    return { statusCode: 422, body: error.toString() }
  }
}
