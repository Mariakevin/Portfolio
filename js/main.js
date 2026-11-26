(function () {
  'use strict';

  var data = window.PORTFOLIO_DATA;
  if (!data) {
    return;
  }

  /* ------------------------------------------------------------------------
     DOM Helpers
     ------------------------------------------------------------------------ */
  function $(selector, scope) {
    return (scope || document).querySelector(selector);
  }

  function $all(selector, scope) {
    return Array.prototype.slice.call((scope || document).querySelectorAll(selector));
  }

  function el(tag, className, text) {
    var node = document.createElement(tag);
    if (className) {
      node.className = className;
    }
    if (text !== undefined && text !== null) {
      node.textContent = text;
    }
    return node;
  }

  function clearNode(node) {
    while (node.firstChild) {
      node.removeChild(node.firstChild);
    }
  }

  function createExternalLink(label, url, className) {
    var anchor = el('a', className || '', label);
    anchor.href = url;
    if (url.indexOf('http') === 0) {
      anchor.target = '_blank';
      anchor.rel = 'noopener noreferrer';
    }
    return anchor;
  }

  function createStatusBadge(statusText, statusKey) {
    var badge = el('span', 'status-badge', statusText || 'Project');
    if (statusKey) {
      badge.setAttribute('data-status', statusKey);
    }
    return badge;
  }

  /* ------------------------------------------------------------------------
     Toast Feedback
     ------------------------------------------------------------------------ */
  var toastTimer = null;
  function showToast(message) {
    var toast = $('#toast');
    if (!toast) return;
    toast.textContent = message;
    toast.hidden = false;
    window.clearTimeout(toastTimer);
    toastTimer = window.setTimeout(function () {
      toast.hidden = true;
    }, 2600);
  }

  /* ------------------------------------------------------------------------
     Theme Manager
     ------------------------------------------------------------------------ */
  function getTheme() {
    return document.documentElement.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
  }

  function setTheme(theme) {
    var normalized = theme === 'dark' ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', normalized);
    document.documentElement.style.colorScheme = normalized;
    try {
      localStorage.setItem('portfolio-theme', normalized);
    } catch (e) {}

    // The user's explicit choice overrides the media-query variants in the markup.
    $all('meta[name="theme-color"]').forEach(function (meta) {
      meta.removeAttribute('media');
      meta.setAttribute('content', normalized === 'dark' ? '#0e1024' : '#f4f5fa');
    });

    var toggle = $('#theme-toggle');
    if (toggle) {
      var nextLabel = normalized === 'dark' ? 'Switch to light theme' : 'Switch to dark theme';
      toggle.setAttribute('aria-label', nextLabel);
      toggle.setAttribute('title', nextLabel);
    }
    return normalized;
  }

  function initTheme() {
    var btn = $('#theme-toggle');
    if (!btn) return;
    btn.addEventListener('click', function () {
      var next = getTheme() === 'dark' ? 'light' : 'dark';
      setTheme(next);
      showToast(next === 'dark' ? 'Dark theme enabled' : 'Light theme enabled');
    });
  }

  /* ------------------------------------------------------------------------
     Mobile Navigation & Print CV
     ------------------------------------------------------------------------ */
  function initMobileNav() {
    var toggle = $('#mobile-menu-toggle');
    var drawer = $('#mobile-nav');
    if (!toggle || !drawer) return;

    function setOpen(isOpen) {
      toggle.setAttribute('aria-expanded', String(isOpen));
      drawer.hidden = !isOpen;
    }

    toggle.addEventListener('click', function () {
      var expanded = toggle.getAttribute('aria-expanded') === 'true';
      setOpen(!expanded);
    });

    $all('.mobile-nav-link', drawer).forEach(function (link) {
      link.addEventListener('click', function () {
        setOpen(false);
      });
    });

    document.addEventListener('keydown', function (event) {
      if (event.key === 'Escape' && !drawer.hidden) {
        setOpen(false);
        toggle.focus();
      }
    });
  }

  function triggerPrintDossier() {
    window.print();
  }

  function initPrintButtons() {
    [$('#print-dossier-btn')].forEach(function (btn) {
      if (btn) {
        btn.addEventListener('click', triggerPrintDossier);
      }
    });
  }

  /* ------------------------------------------------------------------------
     Hydrate Profile & Content
     ------------------------------------------------------------------------ */
  function hydrateProfile() {
    var p = data.profile;
    document.title = p.name + ', ' + p.role;

    var navBrand = $('#nav-brand');
    if (navBrand) navBrand.textContent = p.name;

    var navRole = $('#nav-role');
    if (navRole) navRole.textContent = p.role;

    var metaDescription = $('meta[name="description"]');
    if (metaDescription && p.description) metaDescription.setAttribute('content', p.description);

    var ogTitle = $('meta[property="og:title"]');
    if (ogTitle) ogTitle.setAttribute('content', p.name + ', ' + p.role);

    var ogDescription = $('meta[property="og:description"]');
    if (ogDescription && p.description) ogDescription.setAttribute('content', p.description);

    var statusText = $('#hero-status-text');
    if (statusText) statusText.textContent = p.status;

    var headline = $('#hero-headline');
    if (headline && p.headline) headline.textContent = p.headline;

    var subtitle = $('#hero-subtitle');
    if (subtitle) subtitle.textContent = p.subtitle;

    var metaFocus = $('#meta-focus');
    if (metaFocus) metaFocus.textContent = p.focus;

    var metaLocation = $('#meta-location');
    if (metaLocation) metaLocation.textContent = p.location;

    var resumeLink = $('#resume-download-link');
    if (resumeLink) {
      if (p.cvUrl) {
        resumeLink.href = p.cvUrl;
        resumeLink.hidden = false;
      } else {
        resumeLink.hidden = true;
      }
    }

    var heroLinks = $('#hero-social-links');
    if (heroLinks) {
      clearNode(heroLinks);
      p.socials.forEach(function (s) {
        heroLinks.appendChild(createExternalLink(s.label, s.url));
      });
    }

    var bioTitle = $('#bio-title');
    if (bioTitle) bioTitle.textContent = p.bioTitle;

    var bioParagraphs = $('#bio-paragraphs');
    if (bioParagraphs) {
      clearNode(bioParagraphs);
      p.bioParagraphs.forEach(function (para) {
        bioParagraphs.appendChild(el('p', '', para));
      });
    }

    var emailText = $('#contact-email-text');
    if (emailText) emailText.textContent = p.email;

    var emailLink = $('#contact-email-link');
    if (emailLink) emailLink.href = 'mailto:' + p.email;

    var contactSocials = $('#contact-socials');
    if (contactSocials) {
      clearNode(contactSocials);
      p.socials.forEach(function (s) {
        contactSocials.appendChild(createExternalLink(s.label, s.url, 'social-pill'));
      });
    }

    var footerYear = $('#footer-year');
    if (footerYear) footerYear.textContent = String(new Date().getFullYear());

    var footerName = $('#footer-name');
    if (footerName) footerName.textContent = p.name;
  }

  /* ------------------------------------------------------------------------
     Interactive Hero Architecture Map
     ------------------------------------------------------------------------ */
  function initHeroPlate() {
    var nodes = $all('.plate-node, .plate-mobile-node');
    var readoutTag = $('#plate-readout-tag');
    var readoutText = $('#plate-readout-text');
    var readoutOpen = $('#plate-readout-open');
    if (!nodes.length || !readoutTag || !readoutText || !readoutOpen) return;

    var selectedPlateProject = null;
    var canvas = $('.plate-canvas');

    // Point the heat layer at a position inside the canvas.
    function aimHeat(x, y) {
      if (!canvas) return;
      canvas.style.setProperty('--mx', x + 'px');
      canvas.style.setProperty('--my', y + 'px');
    }

    function aimHeatAtNode(node) {
      if (!canvas || !node) return;
      var c = canvas.getBoundingClientRect();
      var r = node.getBoundingClientRect();
      aimHeat(r.left - c.left + r.width / 2, r.top - c.top + r.height / 2);
    }

    if (canvas) {
      canvas.addEventListener('pointermove', function (event) {
        if (event.pointerType === 'touch') return;
        var c = canvas.getBoundingClientRect();
        aimHeat(event.clientX - c.left, event.clientY - c.top);
      });
      canvas.addEventListener('pointerleave', function () {
        aimHeatAtNode($('.plate-node.is-selected'));
      });
    }

    function selectPlateNode(projectId) {
      var proj = data.projects.find(function (p) {
        return p.id === projectId;
      });
      if (!proj) return;

      selectedPlateProject = proj.id;
      nodes.forEach(function (n) {
        var isSelected = n.getAttribute('data-plate-project') === projectId;
        n.classList.toggle('is-selected', isSelected);
        if (n.matches('.plate-mobile-node')) n.setAttribute('aria-pressed', String(isSelected));
      });

      aimHeatAtNode($('.plate-node[data-plate-project="' + projectId + '"]'));

      readoutTag.textContent = proj.title + ' (' + proj.status + ')';
      readoutText.textContent = proj.problem;
      readoutOpen.hidden = false;
    }

    nodes.forEach(function (node) {
      var id = node.getAttribute('data-plate-project');
      node.addEventListener('click', function () {
        if (node.matches('.plate-mobile-node')) {
          selectPlateNode(id);
          return;
        }
        if (selectedPlateProject === id) {
          openProjectModal(id);
        } else {
          selectPlateNode(id);
        }
      });

      node.addEventListener('mouseenter', function () {
        selectPlateNode(id);
      });

      node.addEventListener('focus', function () {
        selectPlateNode(id);
      });

      node.addEventListener('keydown', function (event) {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault();
          openProjectModal(id);
        }
      });
    });

    readoutOpen.addEventListener('click', function () {
      if (selectedPlateProject) {
        openProjectModal(selectedPlateProject);
      }
    });
  }

  /* ------------------------------------------------------------------------
     Selected Work & Inspector
     ------------------------------------------------------------------------ */
  var activeCategory = 'All';
  var activeProjectId = null;
  var previewToken = 0;
  var hoverIntentTimer = null;
  var prefersReducedMotion = window.matchMedia
    ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
    : false;

  function getCategories() {
    var seen = { All: true };
    var categories = ['All'];
    data.projects.forEach(function (proj) {
      if (!seen[proj.category]) {
        seen[proj.category] = true;
        categories.push(proj.category);
      }
    });
    return categories;
  }

  function renderFilters() {
    var filterBar = $('#project-filters');
    if (!filterBar) return;
    clearNode(filterBar);

    getCategories().forEach(function (cat) {
      var count = cat === 'All'
        ? data.projects.length
        : data.projects.filter(function (p) { return p.category === cat; }).length;

      var btn = el('button', 'filter-btn' + (cat === activeCategory ? ' is-active' : ''), cat + ' (' + count + ')');
      btn.type = 'button';
      btn.setAttribute('aria-pressed', String(cat === activeCategory));
      btn.addEventListener('click', function () {
        activeCategory = cat;
        renderFilters();
        renderProjects();
      });
      filterBar.appendChild(btn);
    });
  }

  function renderStatusLegend() {
    var legend = $('#project-status-legend');
    if (!legend) return;
    clearNode(legend);

    var statuses = [];
    data.projects.forEach(function (project) {
      if (!project.status || statuses.some(function (item) { return item.status === project.status; })) return;
      statuses.push({ status: project.status, statusKey: project.statusKey });
    });

    statuses.forEach(function (item) {
      legend.appendChild(createStatusBadge(item.status, item.statusKey));
    });
  }

  function setPreview(project, animate) {
    var inner = $('#preview-inner');
    if (!inner || !project) return;

    var token = ++previewToken;
    activeProjectId = project.id;

    function fill() {
      var meta = $('#preview-meta');
      var title = $('#preview-title');
      var summary = $('#preview-summary');
      var flow = $('#preview-flow');
      var impact = $('#preview-impact');
      var stack = $('#preview-stack');
      var openBtn = $('#preview-open');
      var repoBtn = $('#preview-repo');
      var status = $('#preview-status');

      if (meta) meta.textContent = project.category;
      if (status) {
        status.textContent = project.status || 'Project';
        status.className = 'status-badge';
        if (project.statusKey) {
          status.setAttribute('data-status', project.statusKey);
        }
      }
      if (title) title.textContent = project.title;
      if (summary) summary.textContent = project.summary;
      if (impact) impact.textContent = project.impact;

      if (flow) {
        clearNode(flow);
        project.architecture.forEach(function (step, i) {
          var item = el('li', 'flow-node');
          item.appendChild(el('span', 'flow-step-num', String(i + 1) + '.'));
          item.appendChild(document.createTextNode(step));
          flow.appendChild(item);
        });
      }

      if (stack) {
        clearNode(stack);
        project.stack.forEach(function (tech) {
          stack.appendChild(el('span', 'chip', tech));
        });
      }

      if (openBtn) {
        openBtn.setAttribute('data-project', project.id);
      }

      if (repoBtn) {
        if (project.repoUrl) {
          repoBtn.href = project.repoUrl;
          repoBtn.hidden = false;
        } else {
          repoBtn.hidden = true;
        }
      }

      inner.classList.remove('is-updating');
    }

    if (animate && !prefersReducedMotion) {
      inner.classList.add('is-updating');
      window.setTimeout(function () {
        if (token === previewToken) fill();
      }, 100);
    } else {
      fill();
    }
  }

  function setActiveRow(row, project) {
    $all('.project-row').forEach(function (item) {
      item.classList.toggle('is-active', item === row);
    });
    setPreview(project, true);
  }

  function renderProjects() {
    var grid = $('#projects-grid');
    if (!grid) return;
    clearNode(grid);

    var filtered = data.projects.filter(function (proj) {
      return activeCategory === 'All' || proj.category === activeCategory;
    });

    var count = $('#work-count');
    if (count) {
      count.textContent = filtered.length + (filtered.length === 1 ? ' project' : ' projects');
    }

    filtered.forEach(function (proj) {
      var row = el('button', 'project-row');
      row.type = 'button';
      row.setAttribute('data-id', proj.id);

      var head = el('div', 'row-head');
      var titleWrap = el('div', 'row-title-wrap');
      titleWrap.appendChild(el('span', 'row-title', proj.title));
      if (proj.tagline) {
        titleWrap.appendChild(el('span', 'row-tagline', proj.tagline));
      }
      head.appendChild(titleWrap);
      row.appendChild(head);

      row.appendChild(el('p', 'row-summary', proj.summary));

      var tags = el('div', 'row-tags');
      if (proj.year) tags.appendChild(el('span', 'row-year mono', proj.year));
      tags.appendChild(createStatusBadge(proj.status, proj.statusKey));
      tags.appendChild(el('span', 'row-category', proj.category));
      tags.appendChild(el('span', 'row-action-hint', 'Read case study'));
      row.appendChild(tags);

      row.addEventListener('mouseenter', function () {
        window.clearTimeout(hoverIntentTimer);
        hoverIntentTimer = window.setTimeout(function () {
          if (activeProjectId !== proj.id) {
            setActiveRow(row, proj);
          }
        }, 75);
      });

      row.addEventListener('mouseleave', function () {
        window.clearTimeout(hoverIntentTimer);
      });

      row.addEventListener('focus', function () {
        if (activeProjectId !== proj.id) {
          setActiveRow(row, proj);
        }
      });

      row.addEventListener('click', function () {
        setActiveRow(row, proj);
        openProjectModal(proj.id);
      });

      grid.appendChild(row);
    });

    if (filtered.length) {
      setPreview(filtered[0], false);
      var firstRow = $('.project-row', grid);
      if (firstRow) firstRow.classList.add('is-active');
    } else {
      activeProjectId = null;
    }
  }

  function initProjectPreview() {
    var openBtn = $('#preview-open');
    if (!openBtn) return;
    openBtn.addEventListener('click', function () {
      var id = openBtn.getAttribute('data-project') || activeProjectId;
      if (id) openProjectModal(id);
    });
  }

  /* ------------------------------------------------------------------------
     Project Case Study Dialog
     ------------------------------------------------------------------------ */
  var currentModalProjectId = null;

  function openDialog(dialog) {
    if (!dialog) return;
    if (typeof dialog.showModal === 'function') {
      if (!dialog.open) {
        dialog.showModal();
      }
    } else {
      dialog.setAttribute('open', '');
    }
  }

  function closeDialog(dialog) {
    if (!dialog) return;
    if (typeof dialog.close === 'function') {
      if (dialog.open) {
        dialog.close();
      }
    } else {
      dialog.removeAttribute('open');
    }
  }

  function openProjectModal(projectId) {
    var projIndex = data.projects.findIndex(function (item) {
      return item.id === projectId;
    });
    var proj = projIndex >= 0 ? data.projects[projIndex] : null;
    var modal = $('#project-modal');
    if (!proj || !modal) return;

    currentModalProjectId = proj.id;

    $('#modal-category').textContent = proj.category + ' (' + proj.status + ')';
    $('#modal-title').textContent = proj.title;

    var modalBody = $('#modal-body');
    clearNode(modalBody);
    modalBody.scrollTop = 0;

    // 1. Problem & Objectives
    var problemBlock = el('section', 'case-block');
    problemBlock.appendChild(el('h3', '', 'Problem and objectives'));
    problemBlock.appendChild(el('p', '', proj.problem));
    modalBody.appendChild(problemBlock);

    // 2. Interactive Execution Sequence
    var archBlock = el('section', 'case-block');
    archBlock.appendChild(el('h3', '', 'System sequence (select a stage to inspect)'));
    var flow = el('ol', 'arch-flow');
    flow.setAttribute('aria-label', 'Project system stages');

    var stageNotes = proj.stageNotes || [];
    var inspector = el('div', 'arch-inspector', stageNotes[0] || proj.summary);
    inspector.setAttribute('aria-live', 'polite');

    proj.architecture.forEach(function (step, index) {
      var li = el('li');
      var btn = el('button', 'arch-stage-btn' + (index === 0 ? ' is-active' : ''));
      btn.type = 'button';
      btn.setAttribute('aria-pressed', String(index === 0));
      btn.appendChild(el('span', 'arch-step-index', 'Step ' + (index + 1)));
      btn.appendChild(el('span', 'arch-step-label', step));

      btn.addEventListener('click', function () {
        $all('.arch-stage-btn', flow).forEach(function (b) {
          b.classList.remove('is-active');
          b.setAttribute('aria-pressed', 'false');
        });
        btn.classList.add('is-active');
        btn.setAttribute('aria-pressed', 'true');
        inspector.textContent = stageNotes[index] || step;
      });

      li.appendChild(btn);
      flow.appendChild(li);
    });

    archBlock.appendChild(flow);
    archBlock.appendChild(inspector);
    modalBody.appendChild(archBlock);

    // 3. Key Decisions
    var tradeoffsBlock = el('section', 'case-block');
    tradeoffsBlock.appendChild(el('h3', '', 'Key decisions and trade-offs'));
    var tradeoffsList = el('ul', 'case-list');
    proj.tradeoffs.forEach(function (item) {
      tradeoffsList.appendChild(el('li', '', item));
    });
    tradeoffsBlock.appendChild(tradeoffsList);
    modalBody.appendChild(tradeoffsBlock);

    // 4. Documented Outcomes
    var outcomesBlock = el('section', 'case-block');
    outcomesBlock.appendChild(el('h3', '', 'Documented outcomes'));
    var outcomesList = el('ul', 'case-list');
    proj.outcomes.forEach(function (item) {
      outcomesList.appendChild(el('li', '', item));
    });
    outcomesBlock.appendChild(outcomesList);
    modalBody.appendChild(outcomesBlock);

    // 5. Failure Handling
    if (proj.failureModes && proj.failureModes.length) {
      var failureBlock = el('section', 'case-block');
      failureBlock.appendChild(el('h3', '', 'Failure handling'));
      var failureList = el('ul', 'case-list');
      proj.failureModes.forEach(function (item) {
        failureList.appendChild(el('li', '', item));
      });
      failureBlock.appendChild(failureList);
      modalBody.appendChild(failureBlock);
    }

    // 6. Limitations
    var limitsBlock = el('section', 'case-block case-limits');
    limitsBlock.appendChild(el('h3', '', 'Limitations and open scope'));
    var limitsList = el('ul', 'case-list');
    (proj.limitations || []).forEach(function (item) {
      limitsList.appendChild(el('li', '', item));
    });
    limitsBlock.appendChild(limitsList);
    modalBody.appendChild(limitsBlock);

    // 7. Connected Research Question
    if (proj.researchId) {
      var linkedResearch = (data.research || []).find(function (r) {
        return r.id === proj.researchId;
      });
      if (linkedResearch) {
        var resBlock = el('section', 'case-block');
        resBlock.appendChild(el('h3', '', 'Related open question'));
        var resBox = el('div', 'case-research-link');
        resBox.appendChild(el('p', '', linkedResearch.index + ': ' + linkedResearch.question));
        var jumpBtn = el('button', 'btn btn-secondary btn-sm', 'View question');
        jumpBtn.type = 'button';
        jumpBtn.addEventListener('click', function () {
          closeDialog(modal);
          var target = $('#research-' + linkedResearch.id) || $('#research');
          if (target) {
            target.scrollIntoView({ behavior: prefersReducedMotion ? 'auto' : 'smooth', block: 'center' });
          }
        });
        resBox.appendChild(jumpBtn);
        resBlock.appendChild(resBox);
        modalBody.appendChild(resBlock);
      }
    }

    // 8. Tools
    var stackBlock = el('section', 'case-block');
    stackBlock.appendChild(el('h3', '', 'Technologies used'));
    var chips = el('div', 'chip-list');
    proj.stack.forEach(function (tech) {
      chips.appendChild(el('span', 'chip', tech));
    });
    stackBlock.appendChild(chips);
    modalBody.appendChild(stackBlock);

    // 9. Artifacts
    var actions = el('div', 'case-actions');
    (proj.artifacts || []).forEach(function (artifact, index) {
      actions.appendChild(createExternalLink(
        artifact.label,
        artifact.url,
        index === 0 ? 'btn btn-primary btn-sm' : 'btn btn-secondary btn-sm'
      ));
    });
    modalBody.appendChild(actions);

    openDialog(modal);
  }

  function stepModalProject(delta) {
    if (!currentModalProjectId || !data.projects.length) return;
    var idx = data.projects.findIndex(function (p) {
      return p.id === currentModalProjectId;
    });
    if (idx < 0) return;
    var nextIdx = (idx + delta + data.projects.length) % data.projects.length;
    openProjectModal(data.projects[nextIdx].id);
  }

  function initProjectModal() {
    var modal = $('#project-modal');
    var closeBtn = $('#modal-close');
    var prevBtn = $('#modal-prev');
    var nextBtn = $('#modal-next');
    if (!modal || !closeBtn) return;

    closeBtn.addEventListener('click', function () {
      closeDialog(modal);
    });

    if (prevBtn) {
      prevBtn.addEventListener('click', function () {
        stepModalProject(-1);
      });
    }

    if (nextBtn) {
      nextBtn.addEventListener('click', function () {
        stepModalProject(1);
      });
    }

    modal.addEventListener('click', function (event) {
      if (event.target === modal) {
        closeDialog(modal);
      }
    });
  }

  /* ------------------------------------------------------------------------
     Capability Evidence Matrix
     ------------------------------------------------------------------------ */
  function initEvidenceGraph() {
    var stackContainer = $('#stack-groups');
    var projContainer = $('#evidence-projects');
    var resContainer = $('#evidence-research');
    var statusText = $('#graph-status-text');
    var resetBtn = $('#graph-reset');

    if (!stackContainer || !projContainer || !resContainer || !statusText) return;

    var selectedSkill = null;
    var selectedProjectId = null;

    function getSkillEntry(skillName) {
      var found = null;
      data.skills.forEach(function (g) {
        g.items.forEach(function (item) {
          if (item.name === skillName) found = item;
        });
      });
      return found;
    }

    function renderGraph() {
      clearNode(stackContainer);
      clearNode(projContainer);
      clearNode(resContainer);

      var activeProjectIds = null;
      var activeResearchIds = null;
      var activeSkillNames = null;

      if (selectedSkill) {
        var entry = getSkillEntry(selectedSkill);
        var linkedProjs = entry ? entry.projects : [];
        activeProjectIds = {};
        activeResearchIds = {};
        linkedProjs.forEach(function (pid) {
          activeProjectIds[pid] = true;
          var pObj = data.projects.find(function (x) { return x.id === pid; });
          if (pObj && pObj.researchId) {
            activeResearchIds[pObj.researchId] = true;
          }
        });

        var projNames = linkedProjs.map(function (pid) {
          var pObj = data.projects.find(function (x) { return x.id === pid; });
          return pObj ? pObj.title : pid;
        });

        if (linkedProjs.length) {
          statusText.textContent = selectedSkill + ' is used in ' + projNames.join(' and ') + '.';
        } else {
          statusText.textContent = selectedSkill + ': ' + ((entry && entry.note) || 'Engineering workflow practice.');
        }
        if (resetBtn) resetBtn.hidden = false;
      } else if (selectedProjectId) {
        var projObj = data.projects.find(function (p) { return p.id === selectedProjectId; });
        activeSkillNames = {};
        activeResearchIds = {};
        if (projObj) {
          data.skills.forEach(function (g) {
            g.items.forEach(function (item) {
              if (item.projects.indexOf(projObj.id) >= 0) {
                activeSkillNames[item.name] = true;
              }
            });
          });
          if (projObj.researchId) {
            activeResearchIds[projObj.researchId] = true;
          }
          statusText.textContent =
            projObj.title +
            ' demonstrates ' +
            Object.keys(activeSkillNames).length +
            ' listed tools' +
            (projObj.researchId ? ' and connects to one open research question.' : '.');
        }
        if (resetBtn) resetBtn.hidden = false;
      } else {
        statusText.textContent =
          'Showing all ' +
          data.skills.length +
          ' capability groups across ' +
          data.projects.length +
          ' repositories and ' +
          (data.research || []).length +
          ' research questions.';
        if (resetBtn) resetBtn.hidden = true;
      }

      // Render skill chips
      data.skills.forEach(function (group) {
        var row = el('div', 'stack-group');
        row.appendChild(el('span', 'stack-group-name', group.group));

        var chips = el('div', 'chip-list');
        group.items.forEach(function (item) {
          var btn = el('button', 'evidence-chip');
          btn.type = 'button';
          btn.appendChild(document.createTextNode(item.name));

          if (item.projects.length) {
            btn.appendChild(el('span', 'evidence-chip-count', '(' + item.projects.length + ')'));
          }

          var isSel = selectedSkill === item.name;
          var isHigh = activeSkillNames && activeSkillNames[item.name];
          var isDim = (selectedSkill && !isSel) || (selectedProjectId && !isHigh);

          btn.classList.toggle('is-selected', isSel);
          btn.classList.toggle('is-highlighted', Boolean(isHigh));
          btn.classList.toggle('is-dimmed', Boolean(isDim));
          btn.setAttribute('aria-pressed', String(isSel));

          btn.addEventListener('click', function () {
            selectedProjectId = null;
            selectedSkill = selectedSkill === item.name ? null : item.name;
            renderGraph();
          });

          chips.appendChild(btn);
        });

        row.appendChild(chips);
        stackContainer.appendChild(row);
      });

      // Render project target rows (sibling buttons)
      data.projects.forEach(function (proj) {
        var row = el('div', 'evidence-target-row');

        var isSel = selectedProjectId === proj.id;
        var isHigh = activeProjectIds && activeProjectIds[proj.id];
        var isDim = (selectedSkill && !isHigh) || (selectedProjectId && !isSel);

        row.classList.toggle('is-selected', isSel);
        row.classList.toggle('is-highlighted', Boolean(isHigh));
        row.classList.toggle('is-dimmed', Boolean(isDim));

        var mainBtn = el('button', 'evidence-target-main');
        mainBtn.type = 'button';
        mainBtn.setAttribute('aria-pressed', String(isSel));
        mainBtn.appendChild(el('span', 'evidence-target-title', proj.title));
        mainBtn.appendChild(el('span', 'evidence-target-meta', proj.status));
        mainBtn.addEventListener('click', function () {
          selectedSkill = null;
          selectedProjectId = selectedProjectId === proj.id ? null : proj.id;
          renderGraph();
        });

        var autopsyBtn = el('button', 'evidence-target-side', 'Case study');
        autopsyBtn.type = 'button';
        autopsyBtn.setAttribute('aria-label', 'Open case study for ' + proj.title);
        autopsyBtn.addEventListener('click', function () {
          openProjectModal(proj.id);
        });

        row.appendChild(mainBtn);
        row.appendChild(autopsyBtn);
        projContainer.appendChild(row);
      });

      // Render research cards
      (data.research || []).forEach(function (res) {
        var card = el('button', 'evidence-target-card');
        card.type = 'button';

        var isHigh = activeResearchIds && activeResearchIds[res.id];
        var isDim = (selectedSkill || selectedProjectId) && !isHigh;

        card.classList.toggle('is-highlighted', Boolean(isHigh));
        card.classList.toggle('is-dimmed', Boolean(isDim));

        card.appendChild(el('span', 'evidence-target-title', res.index + ': ' + res.project));

        var meta = el('div', 'evidence-target-meta');
        meta.appendChild(el('span', '', res.status));
        meta.appendChild(el('span', 'evidence-target-action', 'Jump to question'));
        card.appendChild(meta);

        card.addEventListener('click', function () {
          var target = $('#research-' + res.id) || $('#research');
          if (target) {
            target.scrollIntoView({ behavior: prefersReducedMotion ? 'auto' : 'smooth', block: 'center' });
          }
        });

        resContainer.appendChild(card);
      });
    }

    if (resetBtn) {
      resetBtn.addEventListener('click', function () {
        selectedSkill = null;
        selectedProjectId = null;
        renderGraph();
      });
    }

    renderGraph();
  }

  /* ------------------------------------------------------------------------
     Open Research Questions
     ------------------------------------------------------------------------ */
  function renderResearch() {
    var grid = $('#research-grid');
    if (!grid) return;
    clearNode(grid);

    (data.research || []).forEach(function (item) {
      var article = el('article', 'research-item');
      article.id = 'research-' + item.id;

      var head = el('div', 'research-head');
      head.appendChild(el('span', 'research-index', item.index));
      head.appendChild(el('span', 'research-project', item.project));
      article.appendChild(head);

      article.appendChild(el('h3', 'research-question', item.question));

      var method = el('div', 'research-evidence');
      method.appendChild(el('span', 'research-label', 'Method'));
      method.appendChild(el('p', '', item.method));
      article.appendChild(method);

      var evidence = el('div', 'research-evidence');
      evidence.appendChild(el('span', 'research-label', 'Current evidence'));
      evidence.appendChild(el('p', '', item.evidence));
      article.appendChild(evidence);

      if (item.contextNote) {
        var noteWrap = el('div', 'research-notes-wrap');
        var noteBtn = el('button', 'research-note-btn', 'Read context note');
        noteBtn.type = 'button';
        noteBtn.setAttribute('aria-expanded', 'false');

        var notePanel = el('div', 'research-note-panel', item.contextNote);
        notePanel.hidden = true;

        noteBtn.addEventListener('click', function () {
          var open = notePanel.hidden;
          notePanel.hidden = !open;
          noteBtn.setAttribute('aria-expanded', String(open));
          noteBtn.textContent = open ? 'Hide context note' : 'Read context note';
        });

        noteWrap.appendChild(noteBtn);
        noteWrap.appendChild(notePanel);
        article.appendChild(noteWrap);
      }

      var actions = el('div', 'research-actions');
      if (item.projectId) {
        var autopsyBtn = el('button', 'research-autopsy-btn', 'Read case study');
        autopsyBtn.type = 'button';
        autopsyBtn.addEventListener('click', function () {
          openProjectModal(item.projectId);
        });
        actions.appendChild(autopsyBtn);
      }
      actions.appendChild(createExternalLink('View source', item.link, 'research-link'));
      article.appendChild(actions);

      grid.appendChild(article);
    });
  }

  /* ------------------------------------------------------------------------
     Education & Engineering Principles
     ------------------------------------------------------------------------ */
  function renderPractice() {
    var eduPanel = $('#education-panel');
    if (eduPanel && data.education) {
      clearNode(eduPanel);
      var ed = data.education;
      eduPanel.appendChild(el('span', 'edu-kicker', ed.label + ' · ' + ed.status + (ed.period ? ' · ' + ed.period : '')));
      eduPanel.appendChild(el('h3', 'edu-degree', ed.degree));
      eduPanel.appendChild(el('p', 'edu-school', ed.institution));

      var pointsList = el('ul', 'edu-points');
      ed.points.forEach(function (pt) {
        pointsList.appendChild(el('li', '', pt));
      });
      eduPanel.appendChild(pointsList);

      var cvBtn = el('button', 'btn btn-secondary btn-sm', 'Print CV');
      cvBtn.type = 'button';
      cvBtn.addEventListener('click', triggerPrintDossier);
      eduPanel.appendChild(cvBtn);
    }

    var list = $('#experience-list');
    if (!list) return;
    clearNode(list);

    (data.experience || []).forEach(function (item) {
      var li = el('li', 'experience-item');
      var head = el('div', 'experience-head');
      var titleGroup = el('div');
      titleGroup.appendChild(el('div', 'experience-role', item.role));
      titleGroup.appendChild(el('div', 'experience-org', item.organization));
      head.appendChild(titleGroup);
      head.appendChild(el('span', 'experience-period mono', item.period));
      li.appendChild(head);

      var bullets = el('ul', 'experience-bullets');
      item.bullets.forEach(function (bullet) {
        bullets.appendChild(el('li', '', bullet));
      });
      li.appendChild(bullets);
      list.appendChild(li);
    });

    (data.principles || []).forEach(function (item) {
      var li = el('li', 'principle-item');

      var head = el('div', 'principle-head');
      head.appendChild(el('div', 'principle-title', item.title));
      head.appendChild(el('div', 'principle-context', item.context));
      li.appendChild(head);

      var bullets = el('ul', 'principle-bullets');
      item.points.forEach(function (b) {
        bullets.appendChild(el('li', '', b));
      });
      li.appendChild(bullets);

      list.appendChild(li);
    });
  }

  /* ------------------------------------------------------------------------
     Interactive Command Line
     ------------------------------------------------------------------------ */
  function initTerminal() {
    var dialog = $('#terminal-modal');
    var output = $('#terminal-output');
    var form = $('#terminal-form');
    var input = $('#terminal-input');
    var closeBtn = $('#terminal-close');
    if (!dialog || !output || !form || !input) return;

    var history = [];
    var historyIndex = -1;
    var initialized = false;
    var commandList = [
      'help',
      'whoami',
      'about',
      'projects',
      'open',
      'research',
      'skills',
      'evidence',
      'experience',
      'contact',
      'theme',
      'print',
      'echo',
      'clear',
      'exit'
    ];

    function appendLine(text, className) {
      var line = el('div', 'term-line' + (className ? ' ' + className : ''), text);
      output.appendChild(line);
      output.scrollTop = output.scrollHeight;
      return line;
    }

    function bootMessage() {
      if (initialized) return;
      initialized = true;
      appendLine(data.profile.name + ' portfolio command line', 'term-success');
      appendLine("Type 'help' for available commands, or press Tab to autocomplete.", 'term-muted');
    }

    function openTerminal(initialCommand) {
      bootMessage();
      openDialog(dialog);
      window.setTimeout(function () {
        input.focus();
        if (initialCommand) {
          runCommand(initialCommand);
        }
      }, 20);
    }

    function runCommand(raw) {
      var trimmed = raw.trim();
      if (!trimmed) return;

      history.unshift(trimmed);
      historyIndex = -1;

      appendLine('guest@portfolio:~$ ' + trimmed, 'term-cmd');

      var parts = trimmed.split(/\s+/);
      var cmd = parts[0].toLowerCase();
      var arg = parts.slice(1).join(' ');

      switch (cmd) {
        case 'help':
          appendLine(
            [
              'Available commands:',
              '  whoami / about     Profile, college, and focus',
              '  projects           List all four projects with clickable case studies',
              '  open <id>          Open case study (fundusnet, jobmatch, finai, ledgepill)',
              '  research           List open research questions',
              '  skills             Display tools grouped by domain',
              '  evidence <tech>    Show which projects use a given tool',
              '  experience         Display academic program and principles',
              '  contact            Show email and social profiles',
              '  theme [dark|light] Switch color theme',
              '  print              Print or save CV',
              '  clear              Clear output',
              '  exit               Close window'
            ].join('\n')
          );
          break;

        case 'whoami':
        case 'about':
          appendLine(data.profile.name + ', ' + data.profile.role, 'term-success');
          appendLine(data.profile.subtitle);
          appendLine(data.profile.focus + ' (' + data.profile.location + ')', 'term-muted');
          break;

        case 'projects':
          data.projects.forEach(function (proj) {
            var line = el('div', 'term-line');
            line.appendChild(
              document.createTextNode('[' + proj.id + '] ' + proj.title + ' (' + proj.status + ') ')
            );
            var btn = el('button', 'term-link', 'Open case study');
            btn.type = 'button';
            btn.addEventListener('click', function () {
              closeDialog(dialog);
              openProjectModal(proj.id);
            });
            line.appendChild(btn);
            output.appendChild(line);
          });
          output.scrollTop = output.scrollHeight;
          break;

        case 'open':
        case 'project': {
          if (!arg) {
            appendLine('Usage: open <project-id> (e.g. open fundusnet)', 'term-error');
            break;
          }
          var match = data.projects.find(function (p) {
            return p.id.toLowerCase() === arg.toLowerCase();
          });
          if (!match) {
            appendLine('Project "' + arg + '" not found. Run "projects" to see valid IDs.', 'term-error');
          } else {
            appendLine('Opening case study for ' + match.title + '...', 'term-success');
            closeDialog(dialog);
            openProjectModal(match.id);
          }
          break;
        }

        case 'research':
        case 'frontier':
          (data.research || []).forEach(function (r) {
            appendLine(r.index + ' (' + r.project + '): ' + r.question);
          });
          break;

        case 'skills':
          data.skills.forEach(function (grp) {
            var names = grp.items.map(function (i) { return i.name; });
            appendLine(grp.group.padEnd(20, ' ') + ': ' + names.join(', '));
          });
          break;

        case 'evidence': {
          if (!arg) {
            appendLine('Usage: evidence <tool> (e.g. evidence pytorch)', 'term-error');
            break;
          }
          var query = arg.toLowerCase();
          var matches = [];
          data.skills.forEach(function (grp) {
            grp.items.forEach(function (item) {
              if (item.name.toLowerCase().indexOf(query) >= 0) {
                matches.push(item);
              }
            });
          });
          if (!matches.length) {
            appendLine('No listed tool matched "' + arg + '".', 'term-error');
          } else {
            matches.forEach(function (m) {
              var repoNames = m.projects.length ? m.projects.join(', ') : (m.note || 'workflow practice');
              appendLine(m.name + ': ' + repoNames, 'term-success');
            });
          }
          break;
        }

        case 'experience':
          if (data.education) {
            appendLine(data.education.degree + ', ' + data.education.institution, 'term-success');
            if (data.education.period) appendLine(data.education.period, 'term-muted');
          }
          (data.experience || []).forEach(function (item) {
            appendLine(item.period + ' — ' + item.role + ' (' + item.organization + ')');
          });
          (data.principles || []).forEach(function (item) {
            appendLine(item.title + ' (' + item.context + ')');
          });
          break;

        case 'contact':
          appendLine('Email  : ' + data.profile.email, 'term-success');
          data.profile.socials.forEach(function (s) {
            appendLine(s.label.padEnd(8, ' ') + ': ' + s.url);
          });
          break;

        case 'theme': {
          var targetTheme = arg.toLowerCase();
          if (targetTheme === 'light' || targetTheme === 'dark') {
            setTheme(targetTheme);
            appendLine('Switched to ' + targetTheme + ' theme.', 'term-success');
          } else {
            var next = getTheme() === 'dark' ? 'light' : 'dark';
            setTheme(next);
            appendLine('Switched to ' + next + ' theme.', 'term-success');
          }
          break;
        }

        case 'print':
          closeDialog(dialog);
          triggerPrintDossier();
          break;

        case 'echo':
          appendLine(arg);
          break;

        case 'clear':
          clearNode(output);
          break;

        case 'exit':
        case 'quit':
          closeDialog(dialog);
          break;

        default:
          appendLine('Command not found: ' + cmd + ". Type 'help' for commands.", 'term-error');
      }
    }

    form.addEventListener('submit', function (event) {
      event.preventDefault();
      var val = input.value;
      input.value = '';
      runCommand(val);
    });

    input.addEventListener('keydown', function (event) {
      if (event.key === 'ArrowUp') {
        if (history.length && historyIndex < history.length - 1) {
          historyIndex += 1;
          input.value = history[historyIndex];
          event.preventDefault();
        }
      } else if (event.key === 'ArrowDown') {
        if (historyIndex > 0) {
          historyIndex -= 1;
          input.value = history[historyIndex];
        } else {
          historyIndex = -1;
          input.value = '';
        }
        event.preventDefault();
      } else if (event.key === 'Tab') {
        var rawVal = input.value.toLowerCase();
        if (rawVal.indexOf('open ') === 0 || rawVal.indexOf('project ') === 0) {
          var prefix = rawVal.split(/\s+/)[0] + ' ';
          var partial = rawVal.slice(prefix.length).trim();
          var projMatch = data.projects.find(function (p) {
            return p.id.indexOf(partial) === 0;
          });
          if (projMatch) {
            event.preventDefault();
            input.value = prefix + projMatch.id;
          }
          return;
        }

        var current = rawVal.trim();
        if (!current) return;
        var found = commandList.find(function (c) {
          return c.indexOf(current) === 0;
        });
        if (found) {
          event.preventDefault();
          input.value = found + (found === 'open' || found === 'evidence' || found === 'echo' ? ' ' : '');
        }
      }
    });

    if (closeBtn) {
      closeBtn.addEventListener('click', function () {
        closeDialog(dialog);
      });
    }

    dialog.addEventListener('click', function (event) {
      if (event.target === dialog) {
        closeDialog(dialog);
      }
    });

    var triggerBtn = $('#terminal-toggle');
    if (triggerBtn) {
      triggerBtn.addEventListener('click', function () {
        openTerminal();
      });
    }

    $all('[data-cmd]').forEach(function (chip) {
      chip.addEventListener('click', function () {
        openTerminal(chip.getAttribute('data-cmd'));
      });
    });

    $all('[data-term-cmd]').forEach(function (chip) {
      chip.addEventListener('click', function () {
        runCommand(chip.getAttribute('data-term-cmd'));
        input.focus();
      });
    });

    document.addEventListener('keydown', function (event) {
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault();
        if (dialog.open) {
          closeDialog(dialog);
        } else {
          openTerminal();
        }
      }
    });
  }

  /* ------------------------------------------------------------------------
     Contact Form & Copy Email
     ------------------------------------------------------------------------ */
  function initContact() {
    var copyBtn = $('#copy-email-btn');
    if (copyBtn) {
      copyBtn.addEventListener('click', function () {
        var email = data.profile.email;
        if (navigator.clipboard && navigator.clipboard.writeText) {
          navigator.clipboard.writeText(email).then(
            function () {
              showToast('Copied email address');
            },
            function () {
              showToast('Email: ' + email);
            }
          );
        } else {
          showToast('Email: ' + email);
        }
      });
    }

    var form = $('#contact-form');
    if (!form) return;

    form.addEventListener('submit', function (event) {
      event.preventDefault();

      var nameInput = $('#contact-name');
      var emailInput = $('#contact-email');
      var topicInput = $('#contact-topic');
      var msgInput = $('#contact-message');

      var errName = $('#error-name');
      var errEmail = $('#error-email');
      var errMsg = $('#error-message');
      var statusBox = $('#form-status');

      errName.textContent = '';
      errEmail.textContent = '';
      errMsg.textContent = '';
      statusBox.hidden = true;

      var name = nameInput.value.trim();
      var email = emailInput.value.trim();
      var message = msgInput.value.trim();
      var valid = true;

      if (name.length < 2) {
        errName.textContent = 'Enter your name (at least 2 characters).';
        valid = false;
      }

      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        errEmail.textContent = 'Enter a valid email address.';
        valid = false;
      }

      if (message.length < 10) {
        errMsg.textContent = 'Write a message (at least 10 characters).';
        valid = false;
      }

      if (!valid) return;

      var subject = encodeURIComponent('[' + topicInput.value + '] Message from ' + name);
      var body = encodeURIComponent('From: ' + name + ' (' + email + ')\n\n' + message);
      var mailtoHref = 'mailto:' + data.profile.email + '?subject=' + subject + '&body=' + body;

      clearNode(statusBox);
      statusBox.appendChild(
        document.createTextNode('Email draft prepared for your mail app: ')
      );
      var mailLink = el('a', 'term-link', 'Open prepared email');
      mailLink.href = mailtoHref;
      statusBox.appendChild(mailLink);
      statusBox.hidden = false;

      showToast('Email draft prepared');
      form.reset();
    });
  }

  /* ------------------------------------------------------------------------
     Active Navigation Tracking
     ------------------------------------------------------------------------ */
  function initActiveNav() {
    var navLinks = $all('.nav-link');
    var sections = ['projects', 'about', 'research', 'experience', 'contact']
      .map(function (id) {
        return document.getElementById(id);
      })
      .filter(Boolean);

    if ('IntersectionObserver' in window) {
      var navObserver = new IntersectionObserver(
        function (entries) {
          entries.forEach(function (entry) {
            if (entry.isIntersecting) {
              var id = '#' + entry.target.id;
              navLinks.forEach(function (link) {
                link.classList.toggle('is-active', link.getAttribute('href') === id);
              });
            }
          });
        },
        { rootMargin: '-32% 0px -56% 0px' }
      );

      sections.forEach(function (sec) {
        navObserver.observe(sec);
      });
    }
  }

  /* ------------------------------------------------------------------------
     Boot
     ------------------------------------------------------------------------ */
  hydrateProfile();
  renderFilters();
  renderStatusLegend();
  renderProjects();
  initEvidenceGraph();
  renderResearch();
  renderPractice();

  setTheme(getTheme());

  initHeroPlate();
  initTheme();
  initMobileNav();
  initPrintButtons();
  initProjectModal();
  initProjectPreview();
  initTerminal();
  initContact();
  initActiveNav();
})();
