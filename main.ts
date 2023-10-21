import { App, Editor, MarkdownView, Modal, Notice, Plugin, PluginSettingTab, Setting } from 'obsidian';

// Remember to rename these classes and interfaces!

interface MyPluginSettings {
	NColors: number;
}

const DEFAULT_SETTINGS: MyPluginSettings = {
	NColors: 3
}

export default class MyPlugin extends Plugin {
	settings: MyPluginSettings;

	async onload() {
		await this.loadSettings();

		// This adds a settings tab so the user can configure various aspects of the plugin
		this.addSettingTab(new SampleSettingTab(this.app, this));

		this.registerMarkdownCodeBlockProcessor("csv", (source, el, ctx) => {
			console.log("cjaisj")
		  const rows = source.split("\n").filter((row) => row.length > 0);
	
		  const pre = el.createEl("pre");
		  pre.className = "language-csv";
		  const code = pre.createEl("code");
		  code.className = "is-loaded language-csv";
	
		  for (let i = 0; i < rows.length; i++) {
			const cols = rows[i].split(",");
	
			for (let j: number = 0; j < cols.length; j++) {
			  let a = code.createEl("span", { text: cols[j] });
			  a.className = `token value csv_col_${j % this.settings.NColors}`;
			  if(j !== cols.length -1){
				let el = code.createEl("span", {text: ","});
				el.className = "token punctuation";				
			  } else {
				code.createEl("br");
			  }
			}
		  }
		});
	}

	onunload() {

	}
	
	async loadSettings() {
		this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
	}

	async saveSettings() {
		await this.saveData(this.settings);
	}
}

class SampleSettingTab extends PluginSettingTab {
	plugin: MyPlugin;

	constructor(app: App, plugin: MyPlugin) {
		super(app, plugin);
		this.plugin = plugin;
	}

	display(): void {
		const {containerEl} = this;

		containerEl.empty();

		new Setting(containerEl)
			.setName('Colors Number')
			.addText(text => text
				.setPlaceholder('Enter number...')
				.setValue(this.plugin.settings.NColors.toString())
				.onChange(async (value) => {
					this.plugin.settings.NColors = Number(value);
					await this.plugin.saveSettings();
				}));
	}
}