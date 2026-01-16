import axios from 'axios';

export const paginateGitHub = async (link) => {
    return await paginateGitHubR(link, []);
};

const paginateGitHubR = async (link, items) => {
    const response = await axios.get(link);
    let itemsPaginated = [...items, ...response.data];
    const linkHeader = response.headers.link;
    if (linkHeader && linkHeader.includes(`rel=\"next\"`)) {
        const nextPattern = /(?<=<)([\S]*)(?=>; rel="next")/i;
        link = linkHeader.match(nextPattern)[0];
        itemsPaginated = await paginateGitHubR(link, itemsPaginated);
    }
    return itemsPaginated;
};
