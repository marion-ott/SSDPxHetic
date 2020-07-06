# Déploiement de l'infrastructure avec ansible

## Prérequis

Ansible, ansible-galaxy et ansible-playbook

## Description

## Installation des roles
```
$ cd automation/ansible
$ ansible-galaxy role install -r requirements.yml -c
```
Cette commande permet d'installer la liste des rôles nécessaires à l'infrastructure. 

## Playbooks

Pour lancer le playbook lié au déploiement sur staging, lancez la commande
```
$ ansible-playbook -i inventory/ec2.py staging.yml --user ubuntu --key <path_to_private_key> --become
```

##### OU

Il est possible de lancer la commande pour installer les paquets nécessaire au fonctionnement de l'app dans un premier temps avec le tag common
```
$ ansible-playbook -i inventory/ec2.py staging.yml --user ubuntu --key <path_to_private_key> --become --tags common
```

Et, dans un second temps, on peut lancer l'installation de l'application avec le tag application
```
$ ansible-playbook -i inventory/ec2.py staging.yml --user ubuntu --key <path_to_private_key> --become --tags application
```
### 