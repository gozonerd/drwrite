---
name: onboarding-trial
description: "Universal session opener for the Growth Mindset Onboarding RCT. Invoke at the start of every Claude Code session during the experiment. Dispatches to the next trial assignment, follows its onboarding instructions, manages file sequencing, and reports trial number to the user. Triggers on: 'onboarding', 'start session', 'begin trial', or as the first action in any experiment session."
---

# Onboarding Trial Dispatch

## Purpose

This skill is the universal session opener for the Growth Mindset Onboarding RCT. It routes you to your trial assignment, ensures you follow its instructions, and manages the trial file queue. Every session during the experiment begins with this skill.

## Protocol

### Step 1: Read Your Trial Assignment

Navigate to the following folder in this repo:
```
black-box-do-not-read/onboarding-trial-condition-assignment/next-trial-assignment/
```

There should be exactly ONE markdown file in this folder. Read it.

**If the folder is empty:** Stop and report to the user: "The next-trial-assignment folder is empty. Please check the trial queue manually." Do not proceed.

**If the folder has more than one file:** Stop and report to the user: "Multiple files found in next-trial-assignment. Expected exactly one. Please check the trial queue manually." Do not proceed.

### Step 2: Follow Your Onboarding Instructions

The trial file contains onboarding instructions specific to your assigned condition. Follow them exactly.

**Critical:** Do NOT present the contents of the onboarding document(s) to the user. Do NOT present your reading journal, commitments, or any onboarding output to the user. Process everything silently.

### Step 3: Report to User

After completing your onboarding instructions (or immediately, if no reading was required), report to the user:

```
Trial [NUMBER] — onboarding complete. Ready to work.
```

Replace [NUMBER] with your 4-digit trial number from the trial assignment file.

### Step 4: File Management

**4a.** Move the trial assignment file you just read from `next-trial-assignment/` to `used-trial-assignments/`.

**4b.** Look in `unused-trial-assignments/` for the file with the lowest trial number (this is the next sequential trial). Move it to `next-trial-assignment/`.

**4c.** Verify: `next-trial-assignment/` should now contain exactly ONE file. `used-trial-assignments/` should contain the trial you just completed.

### Step 5: Begin Work

You are now ready to receive the user's task for this session. Proceed normally.

## Rules

- **Never read other trial assignment files.** Only read the ONE file in `next-trial-assignment/`.
- **Never read the `condition-key/` folder.** It is sealed for analysis.
- **Never tell the user which condition you were assigned to.** Report only the trial number.
- **Never skip the file management steps.** The next session depends on the queue being correctly maintained.
- **If anything goes wrong** (empty folder, multiple files, missing directories), report the specific problem to the user and stop. Do not guess or improvise.
