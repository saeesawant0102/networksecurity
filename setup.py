'''
The setup.py file is an essential part of packaging and distributing 
Python projects. It is used by setup tools 
(or distutils in older Python versions) 
to define the configuration of your project, 
such as its metadata, dependencies, and more.
'''

from setuptools import setup, find_packages
from typing import List

def get_requirements()->List[str]:
    """This function reads the requirements.txt 
    file and returns a list of dependencies."""

    requirement_lst:List[str] = []
    try:
        with open("requirements.txt", "r") as file:
            #read lines from the file
            lines = file.readlines()
            #process each line
            for line in lines:
                requirement=line.strip()
                #ignore empty lines nd -e.
                if requirement  and requirement != "-e .":
                    requirement_lst.append(requirement)
    except FileNotFoundError:
        print("requirements.txt file not found.")

    return requirement_lst

setup(
    name="NetworkSecurity",
    version="0.0.1",
    author="Saee Sawant",
    author_email="saeesawant0102@gmail.com",
    packages=find_packages(),
    install_requires=get_requirements(),
)

