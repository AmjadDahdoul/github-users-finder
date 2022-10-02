export const githubApi = async (endpoint: any, method= 'GET') => {
    try {
        const response = await fetch(
            `${process.env.REACT_APP_GITHUB_API_URL}${endpoint}`,
            {
                method,
                headers: {
                    Accept: "application/vnd.github+json",
                    Authorization: `Bearer ${process.env.REACT_APP_GITHUB_ACCESS_TOKEN}`,
                },
            }
        );

        return await response.json();
    } catch (error) {
        console.log(error)
    }

}

