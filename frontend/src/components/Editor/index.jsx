import React, { useState } from "react";

// The editor core
import Editor from "@react-page/editor";
import "@react-page/core/lib/index.css"; // we also want to load the stylesheets
// Require editor ui stylesheet
import "@react-page/ui/lib/index.css";

// Load some exemplary plugins:
import slate from "@react-page/plugins-slate"; // The rich text area plugin
import "@react-page/plugins-slate/lib/index.css"; // Stylesheets for the rich text area plugin
import background from "@react-page/plugins-background"; // A plugin for background images
import "@react-page/plugins-background/lib/index.css"; // Stylesheets for  background layout plugin

// Define which plugins we want to use. We only have slate and background available, so load those.
const plugins = {
    content: [slate()], // Define plugins for content cells. To import multiple plugins, use [slate(), image, spacer, divider]
    layout: [background({ defaultPlugin: slate() })] // Define plugins for layout cells
};

export default () => {
    const [editorValue, setEditorValue] = useState({});
    // save the state somewhere
    // const saveToDatabase = useCallback(() => {
    //     return fetch("/my/save/url", { method: "POST", body: editorvalue });
    // }, []);
    return (
        <Editor plugins={plugins} value={editorValue} onChange={setEditorValue} />
    );
};
