# Career Studio backlog

Updated: 2026-10-21

Status: implementation authorized by the user for the full Career Studio and resume backlog, with whole-project regression required. Implementation is on a review branch; this document records scope and verification notes, not deployment status.

## Accepted Career Studio scope

1. **Career dashboard:** application activity, upcoming interviews, follow-ups, unfinished documents and learning tasks, with direct continue actions.
2. **Visual Resume Studio:** live document preview, direct section editing, accessible section ordering, structured projects/certifications/awards, layout controls and role-specific variants.
3. **Job Application Tracker:** Kanban, table and calendar views; company/role/recruiter details; interview rounds; exact submitted resume and follow-up notes per application.
4. **Job Requirement Review:** editable requirements extracted or entered from a job description, linked to experience, evidence or a learning gap; supported/needs clarification/not covered states.
5. **Resume Version Comparison:** master versus tailored versions, section-level differences, reviewed accept/revert and restoration.
6. **Achievement & Evidence Library:** reusable project contributions, outcomes, appreciation, skill tags and supporting notes; reviewed insertion into documents.
7. **Interview Practice Studio:** role-based question sets, timed sessions, STAR answer structure, follow-ups, attempt history and transparent self-review rubrics.
8. **Career Growth Planner:** target-role requirements, milestones, learning actions, practice tasks and evidence of progress.
9. **Appraisal & Promotion Builder:** review-period achievements, delivered goals, leadership examples, stakeholder feedback and next-period objectives linked to evidence.
10. **Portfolio Studio upgrade:** form-based project entry, screenshot assignment, evidence links, ordering, role-specific portfolios and live layout previews.
11. **Professional Document Workspace:** reusable profile data, document versions and templates for referrals, recruiter replies, follow-ups, offer clarification, resignation and handover, expanding the existing templates.
12. **Offer Comparison Workspace:** fixed/variable pay, bonuses, benefits, work arrangements, notice period and weighted personal priorities, with visible calculations and assumptions.

## Shared UI and information model

- Five main areas: Overview; Profile & Documents; Applications; Interview Practice; Growth & Reviews.
- A master profile supplies facts to reusable documents. Updates to linked documents are previewed and applied explicitly.
- An application brings its job description, tailored resume, achievements, interview preparation, submitted documents and follow-ups together.
- Editable forms and progressive disclosure keep the primary task visible; mobile uses a clear Edit/Preview switch.
- Initial recommended implementation order remains dashboard, resume, applications, requirements and evidence, followed by the other accepted areas. This order is a proposal, not a final scope decision.
- Optional Salesforce Developer / Team Lead starter pack: Apex, LWC, integrations, Agentforce, architecture, code review, mentoring and delivery examples.
- Core workflows should work locally/offline. Optional online AI rewriting or open-ended coaching needs a separate explicit integration decision; rule-based checks and templates must identify their basis.

## Accepted resume-building scope

R01. **Guided starting paths:** blank resume, reviewed import or sample; optional prompts for students, experienced professionals, career switchers, returners and leaders. All sections remain editable regardless of path.

R02. **Reviewed resume import:** text-based PDF, DOCX, pasted text and native project files; show original alongside extracted fields, flag uncertain mappings and preserve existing work until review. Scanned PDFs need a separate OCR path with accuracy review.

R03. **Purpose-built template gallery:** readable technical, graduate, management, academic CV and minimal layouts; preview the user's content before applying; separate content from presentation so switching templates preserves facts.

R04. **Achievement bullet workshop:** one bullet at a time, with action, scope, approach and actual result; highlight vague/repeated wording and unsupported metrics; offer editable structures using supplied facts. Free-form AI rewrites are optional, not assumed.

R05. **Structured experience timeline:** start/end dates and current-role state, date-format consistency, configurable total relevant experience without double-counting overlapping months, and reviewable overlap/gap notices. Career breaks can be included or omitted by the author.

R06. **Page layout workbench:** page boundaries, overflow indicators, page breaks, keep-heading-with-content behavior, section spacing, margins and typography; presets for one page, two pages or longer CVs without forcing one length.

R07. **ATS-oriented text preview:** show extracted/linear reading order, section labels and contact/link content; flag layout choices that make reading order unclear. Report observable checks, never a universal ATS score or hiring prediction.

R08. **Resume quality review:** empty required-by-user fields, unresolved placeholders, inconsistent dates/tense, repeated bullets, malformed contact details and mismatched headline/target role; link each finding to its editable field. Spelling support requires an explicit dictionary/language design.

R09. **Detailed projects, skills and credentials:** per-project role, technologies, contribution, outcome and evidence; grouped skills; certification issuer/date/expiry/credential link; awards, publications and volunteering as optional sections. Skill levels are user supplied.

R10. **Project and bullet selection drawer:** select the most relevant existing evidence for each resume variant, see selected versus omitted content and estimated page impact, and preview before applying. A job requirement can link to the selected supporting bullet.

R11. **Public and anonymous copies:** independently hide address, phone, employer/client names or selected sections for a shareable copy; preview what remains visible while preserving the master profile.

R12. **Multiple languages:** language-specific resume variants and manually editable translations, supported fonts, script-aware layout and explicit review. Automatic translation would be a separate integration; it must not invent facts.

R13. **Export center:** printable PDF, editable DOCX, HTML and plain text, plus native project backup; export preview, selectable sections, sensible filenames and optional metadata review. Each export format needs its own layout/reading-order tests; browser preview alone does not establish export fidelity.

R14. **Application document bundle:** select a reviewed resume version, cover letter, project summary and recruiter email draft; preview a contents list and export a bundle tied to the application. No automatic sending or external submission.

R15. **Reliable editing:** undo/redo, named checkpoints, template-change recovery, opt-in local draft recovery, visible save state and explicit clearing/export controls; test migration of existing career project files before changing their schema.

R16. **Beginner help and examples:** section-specific explanations and clearly fictional examples, prompts for transferable experience, accessible editing controls and a before-export checklist that distinguishes completeness from hiring prospects.

## Implementation decisions

The release implements the connected career areas and resume-building scope in one additional native workspace, preserving the original tools. Guided input, reviewed import, bullet workshop, page controls, quality/text review and real PDF/Word exports build on independent variants and explicit review.

Implementation choices: five single-column template families; PDF/DOCX/text resume import; native Studio v2 plus retained original v1 project import; PDF/DOCX/HTML/text exports; opt-in local recovery; editable language/RTL variants. Direct PDF uses bundled DejaVu Sans/Serif for covered left-to-right characters; other scripts use browser Print / Save as PDF or Word/HTML. Optional AI services remain a separate integration and are not configured. See career-studio.md for exact behavior and limits.

## Regression expectations for a future implementation

- Preserve existing resumes, matcher inputs, achievements, interview notes, skills, templates, portfolio workflows and supported exports.
- Test old project import/migration, local/offline behavior, undo/recovery, reviewed transfers and separation between variants and the master profile.
- Verify mobile/keyboard/accessibility behavior, page layouts and actual exported documents with short, long, empty and multilingual inputs as appropriate to the agreed scope.
- Run the existing whole-project regression and new behavior tests once implementation is authorized.
