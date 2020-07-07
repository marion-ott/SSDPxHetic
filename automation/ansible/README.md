# Déploiement de l'infrastructure avec ansible

## Prérequis

Ansible, ansible-galaxy et ansible-playbook

## Description

## Installation des roles
Saisissez cette commande pour installer la liste des rôles nécessaires à l'infrastructure
```
$ cd automation/ansible
$ ansible-galaxy role install -r requirements.yml -c
```

## Playbooks

Pour lancer le playbook lié au déploiement sur staging, lancez la commande :
```
$ ansible-playbook -i inventory/ec2.py staging.yml --user ubuntu --key <path_to_private_key> --become
```

### Roles

#### Common
Le rôle common pour installer les paquets nécessaires au fonctionnement de l'app

Il est possible de lancer la commande dans un premier temps avec le tag common.
```
$ ansible-playbook -i inventory/ec2.py staging.yml --user ubuntu --key <path_to_private_key> --become --tags common
```
Le rôle application pour copier le docker-compose et le lancer

Et, dans un second temps, on peut lancer l'installation de l'application avec le tag application.
```
$ ansible-playbook -i inventory/ec2.py staging.yml --user ubuntu --key <path_to_private_key> --become --tags application
```
Le rôle database pour importer la donnée nécessaire au premier démarrage

Un tag database est également disponible pour importer toute la donnée.
```
$ ansible-playbook -i inventory/ec2.py staging.yml --user ubuntu --key <path_to_private_key> --become --tags database
```
