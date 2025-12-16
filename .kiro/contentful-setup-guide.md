# Contentful Setup Guide for Portfolio

## 1. Generate New Access Token

1. Visit [Contentful Web App](https://app.contentful.com)
2. Go to **Settings** → **API keys** → **Content management tokens**
3. Click **Generate personal token**
4. Name: "Portfolio MCP Token"
5. Copy the token (starts with `CFPAT-`)

## 2. Update MCP Configuration

Replace `YOUR_NEW_TOKEN_HERE` in `.kiro/settings/mcp.json` with your new token:

```json
{
  "mcpServers": {
    "contentful": {
      "command": "npx",
      "args": ["-y", "@contentful/mcp-server"],
      "env": {
        "SPACE_ID": "hbrrn0bf99r5",
        "CONTENTFUL_MANAGEMENT_ACCESS_TOKEN": "YOUR_NEW_TOKEN_HERE",
        "ENVIRONMENT_ID": "master",
        "CONTENTFUL_HOST": "api.contentful.com"
      },
      "disabled": false,
      "autoApprove": [
        "get_initial_context",
        "list_spaces",
        "list_content_types"
      ]
    }
  }
}
```

## 3. Restart Kiro

After updating the token:

1. Restart Kiro to reload the MCP configuration
2. The Contentful MCP server should reconnect automatically

## 4. Test Connection

Once restarted, I can help you test the connection by:

- Listing your content types
- Checking space permissions
- Setting up the content models for your portfolio

## 5. Content Types to Create

For your portfolio, we'll need these content types:

### Project

- **Title** (Short text, required)
- **Slug** (Short text, required, unique)
- **Short Description** (Short text, required)
- **Description** (Rich text, required)
- **Thumbnail** (Media, required)
- **Gallery** (Media, multiple)
- **Category** (Short text, validation: web, mobile, iot, ai-ml, other)
- **Technologies** (References to Tech Stack entries)
- **Live URL** (Short text)
- **Source URL** (Short text)
- **Featured** (Boolean, default: false)
- **Completed Date** (Date, required)

### Blog Post

- **Title** (Short text, required)
- **Slug** (Short text, required, unique)
- **Excerpt** (Long text, required)
- **Content** (Rich text, required)
- **Featured Image** (Media, required)
- **Tags** (Short text, multiple)
- **Publish Date** (Date, required)
- **Reading Time** (Number)

### Tech Stack

- **Name** (Short text, required)
- **Category** (Short text, validation: language, framework, tool, platform)
- **Icon** (Media)
- **Proficiency** (Short text, validation: beginner, intermediate, advanced)
- **Color** (Short text)

## 6. Next Steps

After setting up:

1. Create sample content for testing
2. Configure webhooks for live updates (optional)
3. Set up preview tokens for draft content
4. Test the integration with your portfolio

## Troubleshooting

**Token Issues:**

- Make sure the token has management permissions
- Check that the space ID is correct
- Verify the token hasn't expired

**Permission Issues:**

- Ensure your Contentful account has admin access to the space
- Check that the space exists and is accessible

**Connection Issues:**

- Restart Kiro after configuration changes
- Check the MCP server logs for detailed error messages
