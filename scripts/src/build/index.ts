import { Command } from '@commander-js/extra-typings';
import { bundlesOption, tabsOption } from '@src/commandUtils';
import { buildDocs, getBuildDocsCommand, getBuildHtmlCommand, getBuildJsonsCommand } from './docs';
import { initTypedoc } from './docs/docsUtils';
import { buildModules, getBuildBundlesCommand, getBuildTabsCommand } from './modules';
import { createBuildCommand, type BuildTask, createBuildCommandHandler } from './utils';
import getWatchCommand from './watch';

const buildAll: BuildTask = async (inputs, opts) => {
  const tdResult = await initTypedoc(inputs.bundles, opts.srcDir, opts.verbose, false);

  const [modulesResult, docsResult] = await Promise.all([
    buildModules(inputs, opts),
    buildDocs(inputs, opts.outDir, tdResult)
  ]);

  return {
    ...modulesResult,
    ...docsResult
  };
};

const buildAllCommandHandler = createBuildCommandHandler(buildAll);
const getBuildAllCommand = () => createBuildCommand('all', 'Build bundles and tabs and documentation')
  .addOption(bundlesOption)
  .addOption(tabsOption)
  .action(buildAllCommandHandler);
const buildModulesOnly: BuildTask = async (inputs, opts) => buildModules(inputs, opts);
const buildModulesOnlyCommandHandler = createBuildCommandHandler(buildModulesOnly);

const getBuildModulesOnlyCommand = () => createBuildCommand('modules', 'Build bundles and tabs only')
  .addOption(bundlesOption)
  .addOption(tabsOption)
  .action(buildModulesOnlyCommandHandler);

const getBuildCommand = () => new Command('build')
  // .addCommand(getBuildAllCommand(), { isDefault: true })
  .addCommand(getBuildModulesOnlyCommand())
  .addCommand(getBuildBundlesCommand())
  .addCommand(getBuildDocsCommand())
  .addCommand(getBuildHtmlCommand())
  .addCommand(getBuildJsonsCommand())
  .addCommand(getBuildTabsCommand())
  .addCommand(getWatchCommand());

export default getBuildCommand;
