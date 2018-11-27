#!usr/bin/env python
import os, subprocess
from github import Github


from github import Github

# create a Github instance:
# using username and password
username = input("Enter a username inside quoteation marks: ")
password = input("Enter your password inside quotation marks: ")
g = Github(username, password)

for repo in g.get_user().get_repos():
    # Prints names of users repos
    print("Name of repo: " + repo.name)
    # Prints the number of stars that repo has
    print("Number of stars: " + str(repo.stargazers_count))
    # Prints the language used in that repo
    print("Language used: " + str(repo.language))
    # Prints all commits 
    print("Attributes: " + str(dir(repo)))
    print("\n")
    
username = "null"
password = "null"