(function() {
  var colors, fs, helpers, iced, inquirer, mfs, request, __iced_k, __iced_k_noop;

  iced = require('iced-runtime');
  __iced_k = __iced_k_noop = function() {};

  helpers = require('./helpers');

  inquirer = require("inquirer");

  colors = require('colors');

  fs = require('fs');

  mfs = require('machinepack-fs');

  request = require('request');

  exports.run = function(argv, done) {
    var choices, config, currConfig, currTarget, data, defaultTheme, deleteTarget, editIndex, editTarget, err, item, notes, reqResult, res, scss_warning, targetAction, targetChoices, targetOpts, theme, themeChoices, themes, ___iced_passed_deferral, __iced_deferrals, __iced_k;
    __iced_k = __iced_k_noop;
    ___iced_passed_deferral = iced.findDeferral(arguments);
    (function(_this) {
      return (function(__iced_k) {
        __iced_deferrals = new iced.Deferrals(__iced_k, {
          parent: ___iced_passed_deferral,
          filename: "lib/configure.iced",
          funcname: "run"
        });
        helpers.loadConfig(__iced_deferrals.defer({
          assign_fn: (function() {
            return function() {
              err = arguments[0];
              return currConfig = arguments[1];
            };
          })(),
          lineno: 11
        }));
        __iced_deferrals._fulfill();
      });
    })(this)((function(_this) {
      return function() {
        config = currConfig || {};
        (function(__iced_k) {
          var _results, _while;
          _results = [];
          _while = function(__iced_k) {
            var _break, _continue, _next;
            _break = function() {
              return __iced_k(_results);
            };
            _continue = function() {
              return iced.trampoline(function() {
                return _while(__iced_k);
              });
            };
            _next = function(__iced_next_arg) {
              _results.push(__iced_next_arg);
              return _continue();
            };
            if ((typeof targetAction !== "undefined" && targetAction !== null ? targetAction.action : void 0) === 'Done Managing Targets') {
              return _break();
            } else {
              targetOpts = ['Create Target'];
              if (_.any(config.targets)) {
                targetOpts.push('Edit Target');
                targetOpts.push('Delete Target');
                targetOpts.push('List Targets');
                targetOpts.push('Done Managing Targets');
              }
              (function(__iced_k) {
                __iced_deferrals = new iced.Deferrals(__iced_k, {
                  parent: ___iced_passed_deferral,
                  filename: "lib/configure.iced",
                  funcname: "run"
                });
                inquirer.prompt([
                  {
                    type: 'list',
                    name: 'action',
                    message: "Manage Targets",
                    choices: targetOpts
                  }
                ], __iced_deferrals.defer({
                  assign_fn: (function() {
                    return function() {
                      return targetAction = arguments[0];
                    };
                  })(),
                  lineno: 30
                }));
                __iced_deferrals._fulfill();
              })(function() {
                targetChoices = _.map(config.targets, function(target) {
                  return "[" + target.target_name + "] - '" + target.theme_name + "' at " + target.domain + ".myshopify.com";
                });
                (function(__iced_k) {
                  var _i, _len;
                  switch (targetAction.action) {
                    case 'Create Target':
                    case 'Edit Target':
                      currTarget = {};
                      editIndex = null;
                      (function(__iced_k) {
                        if (targetAction.action === 'Edit Target') {
                          (function(__iced_k) {
                            __iced_deferrals = new iced.Deferrals(__iced_k, {
                              parent: ___iced_passed_deferral,
                              filename: "lib/configure.iced",
                              funcname: "run"
                            });
                            inquirer.prompt([
                              {
                                type: 'list',
                                name: 'target',
                                message: "Select target to edit",
                                "default": null,
                                choices: targetChoices
                              }
                            ], __iced_deferrals.defer({
                              assign_fn: (function() {
                                return function() {
                                  return editTarget = arguments[0];
                                };
                              })(),
                              lineno: 49
                            }));
                            __iced_deferrals._fulfill();
                          })(function() {
                            editIndex = _.indexOf(targetChoices, editTarget.target);
                            return __iced_k(currTarget = config.targets[editIndex]);
                          });
                        } else {
                          return __iced_k();
                        }
                      })(function() {
                        (function(__iced_k) {
                          __iced_deferrals = new iced.Deferrals(__iced_k, {
                            parent: ___iced_passed_deferral,
                            filename: "lib/configure.iced",
                            funcname: "run"
                          });
                          inquirer.prompt([
                            {
                              type: 'input',
                              name: 'target_name',
                              message: "Enter a name for this target",
                              "default": currTarget.target_name || null
                            }, {
                              type: 'input',
                              name: 'api_key',
                              message: "Shopify Private APP API key?",
                              "default": currTarget.api_key || null
                            }, {
                              type: 'input',
                              name: 'password',
                              message: "Shopify Private APP Password?",
                              "default": currTarget.password || null
                            }, {
                              type: 'input',
                              name: 'domain',
                              message: "Store URL?",
                              "default": currTarget.domain || null
                            }
                          ], __iced_deferrals.defer({
                            assign_fn: (function() {
                              return function() {
                                return choices = arguments[0];
                              };
                            })(),
                            lineno: 78
                          }));
                          __iced_deferrals._fulfill();
                        })(function() {
                          currTarget.target_name = choices.target_name;
                          currTarget.api_key = choices.api_key;
                          currTarget.password = choices.password;
                          currTarget.domain = choices.domain.replace(new RegExp('^https?://'), '').replace(new RegExp('\.myshopify\.com.*'), '');
                          (function(__iced_k) {
                            __iced_deferrals = new iced.Deferrals(__iced_k, {
                              parent: ___iced_passed_deferral,
                              filename: "lib/configure.iced",
                              funcname: "run"
                            });
                            helpers.shopifyRequest({
                              method: 'get',
                              url: "https://" + currTarget.api_key + ":" + currTarget.password + "@" + currTarget.domain + ".myshopify.com/admin/themes.json"
                            }, __iced_deferrals.defer({
                              assign_fn: (function() {
                                return function() {
                                  err = arguments[0];
                                  res = arguments[1];
                                  return reqResult = arguments[2];
                                };
                              })(),
                              lineno: 88
                            }));
                            __iced_deferrals._fulfill();
                          })(function() {
                            themes = reqResult.themes;
                            defaultTheme = _.find(themes, {
                              id: currTarget.theme_id
                            });
                            if (defaultTheme) {
                              defaultTheme = "" + defaultTheme.name + " (" + defaultTheme.role + ")";
                            }
                            themeChoices = _.map(themes, function(theme) {
                              return "" + theme.name + " (" + theme.role + ")";
                            });
                            (function(__iced_k) {
                              __iced_deferrals = new iced.Deferrals(__iced_k, {
                                parent: ___iced_passed_deferral,
                                filename: "lib/configure.iced",
                                funcname: "run"
                              });
                              inquirer.prompt([
                                {
                                  type: 'list',
                                  name: 'theme',
                                  message: "Select theme",
                                  "default": defaultTheme || null,
                                  choices: themeChoices
                                }
                              ], __iced_deferrals.defer({
                                assign_fn: (function() {
                                  return function() {
                                    return choices = arguments[0];
                                  };
                                })(),
                                lineno: 103
                              }));
                              __iced_deferrals._fulfill();
                            })(function() {
                              theme = themes[_.indexOf(themeChoices, choices.theme)];
                              currTarget.theme_name = theme.name;
                              currTarget.theme_id = theme.id;
                              return __iced_k((editIndex != null) && editIndex !== -1 ? (config.targets[editIndex] = currTarget, console.log(colors.yellow("Target Modified!\n\n"))) : (_.isArray(config.targets) ? config.targets.push(currTarget) : config.targets = [currTarget], console.log(colors.yellow("Target Created!\n\n"))));
                            });
                          });
                        });
                      });
                      break;
                    case 'Delete Target':
                      (function(__iced_k) {
                        __iced_deferrals = new iced.Deferrals(__iced_k, {
                          parent: ___iced_passed_deferral,
                          filename: "lib/configure.iced",
                          funcname: "run"
                        });
                        inquirer.prompt([
                          {
                            type: 'list',
                            name: 'target',
                            message: "Select target to delete",
                            "default": null,
                            choices: targetChoices
                          }
                        ], __iced_deferrals.defer({
                          assign_fn: (function() {
                            return function() {
                              return deleteTarget = arguments[0];
                            };
                          })(),
                          lineno: 128
                        }));
                        __iced_deferrals._fulfill();
                      })(function() {
                        editIndex = _.indexOf(targetChoices, deleteTarget.target);
                        return __iced_k(_.pullAt(config.targets, editIndex));
                      });
                      break;
                    case 'List Targets':
                      console.log("");
                      for (_i = 0, _len = targetChoices.length; _i < _len; _i++) {
                        item = targetChoices[_i];
                        console.log(colors.cyan(item));
                      }
                      return __iced_k(console.log(""));
                    default:
                      return __iced_k();
                  }
                })(_next);
              });
            }
          };
          _while(__iced_k);
        })(function() {
          (function(__iced_k) {
            __iced_deferrals = new iced.Deferrals(__iced_k, {
              parent: ___iced_passed_deferral,
              filename: "lib/configure.iced",
              funcname: "run"
            });
            inquirer.prompt([
              {
                type: 'confirm',
                name: 'compile_scss',
                message: "Would you like to enable automatic compiling for scss files?",
                "default": (typeof currConfig !== "undefined" && currConfig !== null ? currConfig.compile_scss : void 0) || false
              }
            ], __iced_deferrals.defer({
              assign_fn: (function() {
                return function() {
                  return choices = arguments[0];
                };
              })(),
              lineno: 146
            }));
            __iced_deferrals._fulfill();
          })(function() {
            config.compile_scss = choices.compile_scss;
            scss_warning = "You have enabled scss compiling.\n\nThe filename entered below will be recompiled anytime ANY scss file changes while using 'quickshot watch'.\nThe file will be created for you if it does not exist.\nYou will want to put all your @import calls in that file.\nThen in your theme.liquid you will only need to include the compiled css file.\n\nSee docs at https://github.com/internalfx/quickshot#autocompiling-scss for more information.";
            (function(__iced_k) {
              if (config.compile_scss) {
                console.log(colors.yellow(scss_warning));
                (function(__iced_k) {
                  __iced_deferrals = new iced.Deferrals(__iced_k, {
                    parent: ___iced_passed_deferral,
                    filename: "lib/configure.iced",
                    funcname: "run"
                  });
                  inquirer.prompt([
                    {
                      type: 'input',
                      name: 'primary_scss_file',
                      message: "Enter relative path to primary scss file.",
                      "default": (typeof currConfig !== "undefined" && currConfig !== null ? currConfig.primary_scss_file : void 0) || 'assets/application.scss',
                      choices: _.map(themes, function(theme) {
                        return theme.name;
                      })
                    }
                  ], __iced_deferrals.defer({
                    assign_fn: (function() {
                      return function() {
                        return choices = arguments[0];
                      };
                    })(),
                    lineno: 169
                  }));
                  __iced_deferrals._fulfill();
                })(function() {
                  config.primary_scss_file = choices.primary_scss_file;
                  (function(__iced_k) {
                    __iced_deferrals = new iced.Deferrals(__iced_k, {
                      parent: ___iced_passed_deferral,
                      filename: "lib/configure.iced",
                      funcname: "run"
                    });
                    fs.readFile(config.primary_scss_file, __iced_deferrals.defer({
                      assign_fn: (function() {
                        return function() {
                          err = arguments[0];
                          return data = arguments[1];
                        };
                      })(),
                      lineno: 171
                    }));
                    __iced_deferrals._fulfill();
                  })(function() {
                    (function(__iced_k) {
                      if (typeof err !== "undefined" && err !== null) {
                        notes = "//  Sass extends the CSS @import rule to allow it to import SCSS and Sass files. All imported SCSS\n//  and Sass files will be merged together into a single CSS output file.\n//  In addition, any variables or mixins defined in imported files can be used in the main file.\n//  Sass looks for other Sass files in the current directory, and the Sass file directory under Rack, Rails, or Merb.\n//  Additional search directories may be specified using the :load_paths option, or the --load-path option on the command line.\n//  @import takes a filename to import. By default, it looks for a Sass file to import directly,\n//  but there are a few circumstances under which it will compile to a CSS @import rule:\n\n//    If the file’s extension is .css.\n//    If the filename begins with http://.\n//    If the filename is a url().\n//    If the @import has any media queries.\n\n//  If none of the above conditions are met and the extension is .scss or .sass, then the named Sass or SCSS file will be imported.\n//  If there is no extension, Sass will try to find a file with that name and the .scss or .sass extension and import it.\n\n//  For example,\n//    @import \"foo.scss\";\n\n//  or\n//    @import \"foo\";";
                        (function(__iced_k) {
                          __iced_deferrals = new iced.Deferrals(__iced_k, {
                            parent: ___iced_passed_deferral,
                            filename: "lib/configure.iced",
                            funcname: "run"
                          });
                          fs.writeFile(config.primary_scss_file, notes, __iced_deferrals.defer({
                            assign_fn: (function() {
                              return function() {
                                return err = arguments[0];
                              };
                            })(),
                            lineno: 196
                          }));
                          __iced_deferrals._fulfill();
                        })(__iced_k);
                      } else {
                        return __iced_k();
                      }
                    })(__iced_k);
                  });
                });
              } else {
                return __iced_k();
              }
            })(function() {
              config.configVersion = CONFIGVERSION;
              return mfs.writeJson({
                json: config,
                destination: "quickshot.json",
                force: true
              }).exec({
                error: function(err) {
                  console.log(colors.red(err));
                  return done();
                },
                success: function() {
                  console.log(colors.green("\nConfiguration saved!\n"));
                  return done();
                }
              });
            });
          });
        });
      };
    })(this));
  };

}).call(this);
