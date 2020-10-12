Git workflow
1. Create branch: git checkout -b ‘some-branch-name’
2. Do work
3. Add new files: git add .
4. Commit: git commit -m ‘feat: added some component’
5. Push: git push origin some-branch-name
6. Click the generated link to github
7. Assign reviewer
8. Reviewer will review and click “Add your review”, “approve” , “submit review”, “merge pull request”
9. Delete branch if no longer needed


Git workflow on branch instead of master:
1. Pull: git checkout -b *new_branch_name* origin/*original-branch-name*
2. Push: git push origin HEAD:*original-branch-name*
